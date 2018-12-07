import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionController } from './action.controller';
import { ActionService } from './action.service';
import { Action } from './action.entity';
import { ActionRepository } from './action.repository';
import { StocksService } from '../stocks/stocks.service';
import { StocksModule } from '../stocks/stocks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Action, ActionRepository]),
    forwardRef(() => StocksModule),
  ],
  controllers: [ActionController],
  providers: [ActionService],
  exports: [ActionService],
})
export class ActionModule {}
