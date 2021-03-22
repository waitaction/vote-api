import { Module } from '@nestjs/common';
import { ElectionService } from './election.service';
import { ElectionController } from './election.controller';

@Module({
  providers: [ElectionService],
  controllers: [ElectionController]
})
export class ElectionModule {}
