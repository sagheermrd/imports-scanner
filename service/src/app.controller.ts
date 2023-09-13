import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/common';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/scan-imports')
  scanImports(@Body() body: CreateDto) {
    try {
      this.appService.transferFiles(body.sourceDirectory);
      return this.appService.scanFileImports();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something is wrong, please try again later or contact support service!',
      );
    }
  }
}
