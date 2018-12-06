import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { Journal } from './journal.entity';
import { JournalRepository } from './journal.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Journal, JournalRepository])],
  controllers: [JournalController],
  providers: [JournalService],
  exports: [JournalService],
})
export class JournalModule {}
