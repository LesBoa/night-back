import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';
import { Stocks } from '../stocks/stocks.entity';

@Entity()
export class Action extends DbAuditModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  name: string;

  @ApiModelProperty({ required: false })
  @Column()
  quantity: number;

  @ApiModelProperty({ required: false })
  @Column({ length: 500 })
  icon: string;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => User, user => user.actions, { onDelete: 'CASCADE' })
  @Exclude()
  user: User;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => Stocks, stocks => stocks.actions, { onDelete: 'CASCADE' })
  @Exclude()
  stocks: Stocks;
}
