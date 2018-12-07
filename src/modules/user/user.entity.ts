import { DbAuditModel } from '../../utils/dbmodel.model';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Journal } from '../journal/journal.entity';
import { HealthInfo } from '../health-info/health-info.entity';

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

  @OneToMany(type => HealthInfo, healthInfo => healthInfo.user)
  healthInfos: HealthInfo[];
}
