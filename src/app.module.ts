import { Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
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
import { Repository } from 'typeorm';
import { MailServer } from './lib/mail-server';
import { VoteDetailResultModel } from './shared/vote-detail-result-model';
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
  constructor(
    @InjectRepository(ElectionDetail)
    public readonly electionRepository: Repository<ElectionDetail>,
    @InjectRepository(VoteDetail)
    public readonly voteDetailRepository: Repository<VoteDetail>,
    @InjectRepository(Voter)
    public readonly voterRepository: Repository<Voter>,
    @InjectRepository(Candidate)
    public readonly candidateRepository: Repository<Candidate>
  ) {
    this.crontask()
  }


  /**
   * 监控投票结果任务
   */
  crontask() {
    try {
      const cron = require('node-cron');
      // 每五分钟执行一次任务
      cron.schedule('*/1 * * * *', async () => {
        // 查询已结束且valid为true的选举
        let electionList = await this.electionRepository.find({ valid: true, endTime: { $lt: new Date().getTime() } } as any);
        if (electionList && electionList.length > 0) {
          let mails: Array<string> = new Array<string>();
          for (const item of electionList) {
            // 查询参加上场选举的所有投票人邮箱
            let voteList = await this.voteDetailRepository.find({ electionId: item.id.toString(), valid: true });
            if (voteList && voteList.length > 0) {
              let voterIdCards = voteList.map((value) => value.voterIdCard)
              let voters = await this.voterRepository.find({ idCard: { '$in': voterIdCards } } as any);
              mails.push(...voters.map(value => value.email));
              let content = "选举结果如下: <br><br>";
              let voteResultNumber = await this.queryVoteResultNumber(item.id.toString());
              if (voteResultNumber && voteResultNumber.length > 0) {
                for (const resultNumber of voteResultNumber) {
                  content += `候选人:${resultNumber.candidateName}  票数:${resultNumber.totalCount}票 <br>`;
                }
              }
              //发送邮件,测试用,实际项目请写在配置文件
              let mailServer = new MailServer({
                service: 'QQ',
                user: 'littlenotice@qq.com',
                password: 'shcxiuqmidaadadh',
              });
              mailServer.sendMail(mails, "您参加的选举投票结果通知", `<div>${content}</div>`);
              item.valid = false;
              await this.electionRepository.save(item);
            }

          }
        }
      });
    } catch (error) {
      console.error(error);
    }

  }


  async queryVoteResultNumber(electionId: string): Promise<Array<VoteDetailResultModel>> {

    let arr: Array<VoteDetailResultModel> = new Array();
    // 查询出此场选举有多少个候选人
    let electionInfo = await this.electionRepository.findOne(electionId);
    if (electionInfo && electionInfo.candidateIds && electionInfo.candidateIds.length > 0) {
      for (const cId of electionInfo.candidateIds) {
        let candidate = await this.candidateRepository.findOne(cId);
        let voteList = await this.voteDetailRepository.find({ candidateId: cId, electionId: electionId });
        let voterIdCards = voteList.map((value) => value.voterIdCard)
        let voters = await this.voterRepository.find({ idCard: { '$in': voterIdCards } } as any);
        arr.push({
          candidateIdCard: candidate.idCard,
          candidateName: candidate.name,
          totalCount: voteList.length,
          electionId: electionId,
          voters: voters
        });
      }
    }
    return arr;
  }
}
