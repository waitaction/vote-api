import { Module } from '@nestjs/common';
import { VoterService } from './voter.service';
import { VoterController } from './voter.controller';
import { Voter } from 'src/entity/Voter';
import { VoteDetail } from 'src/entity/VoteDetail';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElectionDetail } from 'src/entity/ElectionDetail';
import { Candidate } from 'src/entity/Candidate';

@Module({
  imports: [TypeOrmModule.forFeature([Voter, VoteDetail, ElectionDetail, Candidate])],
  providers: [VoterService],
  controllers: [VoterController]
})
export class VoterModule { }
