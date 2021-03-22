import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateModule } from './candidate/candidate.module';
import { ElectionModule } from './election/election.module';
import { VoterModule } from './voter/voter.module';
@Module({
  imports: [CandidateModule, ElectionModule, VoterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() { }
}
