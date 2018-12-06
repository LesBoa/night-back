import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Journal extends DbAuditModel {
  @ApiModelProperty({ required: true })
  @Column({ length: 500 })
  title: string;

  @ApiModelProperty({ required: false })
  @Column({ length: 1000 })
  description: string;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => User, user => user.journaux, { onDelete: 'CASCADE' })
  @Exclude()
  user: User;
}
