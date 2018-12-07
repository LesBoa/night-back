import { IsArray, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { TodolistItem } from '../todolist-item/todolist-item.entity';

export class ItemTagDto {
  @IsString()
  @ApiModelProperty({ example: 'Tag test' })
  name: string;

  @IsString()
  @ApiModelProperty({ example: 'green' })
  color: string;

  @ApiModelProperty()
  todolistItem: TodolistItem;
}
