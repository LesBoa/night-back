import {
  IsArray,
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { ItemTag } from '../item-tag/item-tag.entity';

export class TodolistItemDto {
  @IsString()
  @ApiModelProperty({ example: 'Todo: chasser' })
  title: string;

  @IsString()
  @ApiModelProperty({ example: 'Une bonne chasse des familles' })
  description: string;

  @Type(() => Date)
  @IsDate()
  @ApiModelProperty({ example: 1544131451 })
  startTime: Date;

  @Type(() => Date)
  @IsDate()
  @ApiModelProperty({ example: 1544131999 })
  endTime: Date;

  @IsBoolean()
  @ApiModelProperty({ example: true })
  isPriority: boolean;

  @IsBoolean()
  @ApiModelProperty({ example: false })
  isFavorite: boolean;

  @IsBoolean()
  @ApiModelProperty({ example: false })
  isDone: boolean;

  @IsArray()
  @ApiModelProperty()
  tags: ItemTag[];
}
