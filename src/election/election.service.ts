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
            election.valid = true;
        } else if (state == ElectionStateEnum.END) {
            election.valid = false;
        }
        return this.electionRepository.save(election);
    }
}
