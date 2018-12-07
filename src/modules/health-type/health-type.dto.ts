import { IsArray, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { isString } from 'util';

export class HealthTypeDto {
  @IsString()
  @ApiModelProperty({ example: 'Rythme cardique' })
  type: string;

  @IsString()
  @ApiModelProperty({ example: 'Bpm' })
  unit: string;
}
