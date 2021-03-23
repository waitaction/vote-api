import { Module } from '@nestjs/common';
import { VoterService } from './voter.service';
import { VoterController } from './voter.controller';
import { Voter } from 'src/entity/Voter';
import { VoteDetail } from 'src/entity/VoteDetail';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Voter, VoteDetail])],
  providers: [VoterService],
  controllers: [VoterController]
})
export class VoterModule { }
