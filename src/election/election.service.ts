import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    async createElection(beginTime: number, endTime: number): Promise<ElectionDetail> {
        let election = new ElectionDetail(beginTime, endTime);
        let result = await this.electionRepository.save(election);
        return result;
    }

    /**
     * 将候选人添加到选举
     * @param candidates 多个候选人id
     * @param electionId 选举id
     */
    addCandidateToElection(candidates: Array<string>, electionId: string): Promise<boolean> {
        return null;
    }
}
