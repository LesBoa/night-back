import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { TodolistItem } from '../todolist-item/todolist-item.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class ItemTag extends DbAuditModel {
  @Column()
  @ApiModelProperty()
  nom: string;

  @Column()
  @ApiModelProperty()
  color: string;

  @ApiModelProperty()
  @ManyToOne(type => TodolistItem, todolistItem => todolistItem.tags, {
    onDelete: 'CASCADE',
  })
  todolistItem: TodolistItem;
}
