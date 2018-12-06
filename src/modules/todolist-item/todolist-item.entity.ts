import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { ItemTag } from '../item-tag/item-tag.entity';

@Entity()
export class TodolistItem extends DbAuditModel {
  @Column()
  @ApiModelProperty()
  title: string;

  @Column()
  @ApiModelProperty()
  description: string;

  @Column()
  @ApiModelProperty()
  startTime: Date;

  @Column()
  @ApiModelProperty()
  endTime: Date;

  @Column()
  @ApiModelProperty()
  isPriority: boolean;

  @Column()
  @ApiModelProperty()
  isFavorite: boolean;

  @Column()
  @ApiModelProperty()
  isDone: boolean;

  @Column()
  @ApiModelProperty()
  @OneToMany(type => ItemTag, itemTag => itemTag.todolistItem)
  tags: ItemTag[];
}
