import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @ApiProperty({ required: true })
  sourceDirectory: string;
}
