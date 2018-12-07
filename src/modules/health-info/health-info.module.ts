import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthInfoController } from './health-info.controller';
import { HealthInfoService } from './health-info.service';
import { HealthInfo } from './health-info.entity';
import { HealthInfoRepository } from './health-info.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HealthInfo, HealthInfoRepository])],
  controllers: [HealthInfoController],
  providers: [HealthInfoService],
  exports: [HealthInfoService],
})
export class HealthInfoModule {}
