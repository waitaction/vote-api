import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateModule } from './candidate/candidate.module';
import { ElectionModule } from './election/election.module';
import { Candidate } from './entity/Candidate';
import { ElectionDetail } from './entity/ElectionDetail';
import { User } from './entity/User';
import { VoteDetail } from './entity/VoteDetail';
import { Voter } from './entity/Voter';
import { VoterModule } from './voter/voter.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: "default",
      type: "mongodb",
      url: process.env.MONGODB_URL ? process.env.MONGODB_URL : "mongodb://localhost",
      database: "votedb",
      synchronize: true,
      keepConnectionAlive: true,
      entities: [
        User,
        ElectionDetail,
        Candidate,
        VoteDetail,
        Voter
      ],
      logging: [
        "query",
        "error"
      ]
    }),
    CandidateModule,
    ElectionModule,
    VoterModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() { }
}
