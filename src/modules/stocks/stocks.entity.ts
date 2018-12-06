import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Stocks extends DbAuditModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  name: string;

  @ApiModelProperty({ required: false })
  @Column()
  quantity: number;

  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  unit: string;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => User, user => user.stocks, { onDelete: 'CASCADE' })
  @Exclude()
  user: User;
}
