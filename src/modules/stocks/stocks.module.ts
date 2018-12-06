import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { Stocks } from './stocks.entity';
import { StocksRepository } from './stocks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Stocks, StocksRepository])],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}
