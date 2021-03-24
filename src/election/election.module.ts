import { Module } from '@nestjs/common';
import { ElectionService } from './election.service';
import { ElectionController } from './election.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionDetail } from '../entity/ElectionDetail';

@Module({
  imports: [TypeOrmModule.forFeature([ElectionDetail])],
  providers: [ElectionService],
  controllers: [ElectionController],
  exports: [TypeOrmModule]
})
export class ElectionModule { }
