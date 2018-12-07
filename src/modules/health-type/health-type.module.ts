import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthTypeController } from './health-type.controller';
import { HealthTypeService } from './health-type.service';
import { HealthType } from './health-type.entity';
import { HealthTypeRepository } from './health-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HealthType, HealthTypeRepository])],
  controllers: [HealthTypeController],
  providers: [HealthTypeService],
  exports: [HealthTypeService],
})
export class HealthTypeModule {}
