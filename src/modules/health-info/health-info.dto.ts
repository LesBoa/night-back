import {
  IsArray,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { HealthType } from '../health-type/health-type.entity';

export class HealthInfoDto {
  @IsNumber()
  @ApiModelProperty({ example: '68' })
  value: number;

  @ApiModelProperty()
  healthType: HealthType;
}
