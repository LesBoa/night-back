import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';
import { HealthType } from '../health-type/health-type.entity';

@Entity()
export class HealthInfo extends DbAuditModel {
  @Column()
  @ApiModelProperty()
  value: number;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => HealthType, healthType => healthType.healthInfos, {
    onDelete: 'CASCADE',
  })
  @Exclude()
  healthType: HealthType;

  @ApiModelProperty({ required: true })
  @ManyToOne(type => User, user => user.healthInfos, { onDelete: 'CASCADE' })
  @Exclude()
  user: User;
}
