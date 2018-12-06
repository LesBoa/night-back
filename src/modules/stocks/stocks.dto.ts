import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class StocksDto {
  @IsString()
  @ApiModelProperty({ example: 'Water' })
  name: string;

  @IsNumber()
  @ApiModelProperty({ example: 1 })
  quantity: number;

  @IsString()
  @ApiModelProperty({ example: 'Liter' })
  unit: string;
}
