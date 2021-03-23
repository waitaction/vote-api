import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteDetail } from 'src/entity/VoteDetail';
import { Repository } from 'typeorm';
import { Voter } from '../entity/Voter';
/**
 * 投票的用户
 */
@Injectable()
export class VoterService {

    constructor(
        @InjectRepository(Voter)
        public readonly voterRepository: Repository<Voter>,
        @InjectRepository(VoteDetail)
        public readonly voteDetailRepository: Repository<VoteDetail>) {

    }
    /**
     * 登记投票人
     * @param email 投票人邮箱
     * @param idCard 投票人身份证
     */
    createVoter(email: string, idCard: string): Promise<Voter> {
        return null;
    }

    /**
     * 投票
     * @param electionId 选举id
     * @param candidateIdCard 候选人身份证号
     * @param voterIdCard 投票人身份证号
     */
    async vote(electionId: string, candidateIdCard: string, voterIdCard: string): Promise<boolean> {
        return true;
    }
}
