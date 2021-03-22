import { Injectable } from '@nestjs/common';
import { ElectionDetail } from '../entity/ElectionDetail';
/**
 * 选举
 */
@Injectable()
export class ElectionService {
    /**
     * 创建一个选举
     */
    createElection(beginTime: number, endTime: number): Promise<ElectionDetail> {
        return null;
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
