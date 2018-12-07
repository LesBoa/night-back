import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTagController } from './item-tag.controller';
import { ItemTagService } from './item-tag.service';
import { ItemTag } from './item-tag.entity';
import { ItemTagRepository } from './item-tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ItemTag, ItemTagRepository])],
  controllers: [ItemTagController],
  providers: [ItemTagService],
  exports: [ItemTagService],
})
export class ItemTagModule {}
