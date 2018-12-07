import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { HealthInfo } from '../health-info/health-info.entity';

@Entity()
export class HealthType extends DbAuditModel {
  @Column()
  @ApiModelProperty()
  type: string;

  @Column()
  @ApiModelProperty()
  unit: string;

  @OneToMany(type => HealthInfo, healthInfo => healthInfo.healthType)
  healthInfos: HealthInfo[];
}
