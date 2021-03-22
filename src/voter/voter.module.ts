import { Module } from '@nestjs/common';
import { VoterService } from './voter.service';
import { VoterController } from './voter.controller';

@Module({
  providers: [VoterService],
  controllers: [VoterController]
})
export class VoterModule {}
