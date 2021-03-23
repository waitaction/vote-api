import { Candidate } from './../entity/Candidate';
import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate])],
  providers: [CandidateService],
  controllers: [CandidateController]
})
export class CandidateModule { }
