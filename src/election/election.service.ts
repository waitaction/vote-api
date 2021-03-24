import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectionModel } from 'src/shared/election-model';
import { ElectionStateEnum } from 'src/shared/election-state.enum';
import { Repository } from 'typeorm';
import { ElectionDetail } from '../entity/ElectionDetail';
/**
 * 选举
 */
@Injectable()
export class ElectionService {
    constructor(
        @InjectRepository(ElectionDetail)
        public readonly electionRepository: Repository<ElectionDetail>) {

    }
    /**
     * 创建一个选举
     */
    async createElection(electionInfo: ElectionModel): Promise<ElectionDetail> {
        let election = new ElectionDetail(electionInfo.beginTime, electionInfo.endTime, electionInfo.candidateIds);
        return this.electionRepository.save(election);
    }

    /**
     * 更改选举状态
     * @param electionId 选举id
     * @param state 选举状态（开始或结束）
     */
    async changeElectionState(electionId: string, state: ElectionStateEnum): Promise<ElectionDetail> {
        let election = await this.electionRepository.findOne(electionId);
        if (election == null) {
            throw new Error("选举不存在");
        }
        if (state == ElectionStateEnum.START) {
            //选举开始时间设为当前时间
            election.beginTime = new Date().getTime();
            election.valid = true;
        } else if (state == ElectionStateEnum.END) {
            //选举结束时间设为当前时间
            election.endTime = new Date().getTime();
            election.valid = false;
        }
        return this.electionRepository.save(election);
    }


}
