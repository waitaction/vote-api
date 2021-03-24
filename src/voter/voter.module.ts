import { Module } from '@nestjs/common';
import { VoterService } from './voter.service';
import { VoterController } from './voter.controller';
import { Voter } from '../entity/Voter';
import { VoteDetail } from '../entity/VoteDetail';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionDetail } from '../entity/ElectionDetail';
import { Candidate } from '../entity/Candidate';

@Module({
  imports: [TypeOrmModule.forFeature([Voter, VoteDetail, ElectionDetail, Candidate])],
  providers: [VoterService],
  controllers: [VoterController]
})
export class VoterModule { }
