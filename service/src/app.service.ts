import * as fse from 'fs-extra';
import * as path from 'path';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TARGET_DIRECTORY, DEFAULT_ROOT_FILE_NAME } from './utils/utils';

export type TreeNodeDto = {
  title: string;
  children: TreeNodeDto[];
};

@Injectable()
export class AppService {
  scanFileImports() {
    // Assuming root file name is the default name 'root.prog'
    const filePath = `${TARGET_DIRECTORY}/${DEFAULT_ROOT_FILE_NAME}`;
    this.validateFile(filePath);
    const imports = this.readImports(filePath);
    return {
      data: this.mapNestedImports(imports, filePath),
      rootfile: DEFAULT_ROOT_FILE_NAME,
    };
  }

  mapNestedImports(imports: string[], filePath: string) {
    return imports?.map((importPath) => {
      const absolutePath = path.resolve(path.dirname(filePath), importPath);
      const title =
        path.parse(absolutePath).name + path.parse(absolutePath).ext;

      const nestedImports = this.readImports(absolutePath);

      let children: TreeNodeDto[];
      if (nestedImports.length) {
        children = this.mapNestedImports(nestedImports, filePath);
      }
      return { title, children };
    });
  }

  private readImports(filePath: string) {
    const fileContent = fse.readFileSync(filePath, 'utf8');
    const lines = fileContent.split(/\r?\n/);
    const imports: string[] = [];

    for (const line of lines) {
      // Assuming import statement structure as 'import ./path/file.lib'
      if (line.trim().startsWith('import')) {
        const importlib = line.split('import');
        imports.push(importlib.pop().trim().replace(';', ''));
      }
    }
    return imports;
  }

  private validateFile(filepath: string) {
    if (!fse.existsSync(filepath)) {
      throw new NotFoundException(
        'File does not exist, please provide a valid file name',
      );
    }
  }

  transferFiles(sourcePath: string) {
    if (!fse.existsSync(sourcePath)) {
      throw new InternalServerErrorException(
        'Source path does not exists, please provide a valid path.',
      );
    }
    fse.copySync(sourcePath, TARGET_DIRECTORY);
  }
}
