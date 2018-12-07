import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Journal } from '../journal/journal.entity';
import { HealthInfo } from '../health-info/health-info.entity';
import { Stocks } from '../stocks/stocks.entity';
import { Action } from '../action/action.entity';
import { TodolistItem } from '../todolist-item/todolist-item.entity';
import { ItemTag } from '../item-tag/item-tag.entity';

@Entity()
export class User extends DbAuditModel {
  @Column()
  @ApiModelProperty({ example: 'foo@bar.fr' })
  email: string;

  @Column()
  @ApiModelProperty()
  firstName: string;

  @Column()
  @ApiModelProperty()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(type => Journal, journal => journal.user)
  journaux: Journal[];

  @OneToMany(type => TodolistItem, todolistItem => todolistItem.user)
  todolistItems: TodolistItem[];

  @OneToMany(type => ItemTag, itemTag => itemTag.user)
  itemTags: ItemTag[];

  @OneToMany(type => HealthInfo, healthInfo => healthInfo.user)
  healthInfos: HealthInfo[];

  @OneToMany(type => Stocks, stocks => stocks.user)
  stocks: Stocks[];

  @OneToMany(type => Action, actions => actions.user)
  actions: Action[];
}
