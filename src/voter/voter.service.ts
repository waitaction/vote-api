import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from 'src/entity/Candidate';
import { ElectionDetail } from 'src/entity/ElectionDetail';
import { VoteDetail } from 'src/entity/VoteDetail';
import { Tool } from 'src/lib/tool';
import { VoteResultModel } from 'src/shared/vote-result-model';
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
        public readonly voteDetailRepository: Repository<VoteDetail>,
        @InjectRepository(ElectionDetail)
        public readonly electionRepository: Repository<ElectionDetail>,
        @InjectRepository(Candidate)
        public readonly candidateRepository: Repository<Candidate>) {

    }
    /**
     * 登记投票人
     * @param email 投票人邮箱
     * @param idCard 投票人身份证
     */
    async saveVoter(email: string, idCard: string): Promise<Voter> {
        //校验身份证号和邮箱
        if (!Tool.validateIdCardHk(idCard)) {
            throw new Error("请输入香港身份证");
        }
        if (!Tool.validateMail(email)) {
            throw new Error("请输入正确的邮箱");
        }
        let voter = await this.voterRepository.findOne({ idCard: idCard });
        if (voter) {
            voter.email = email;
        } else {
            voter = new Voter(idCard, email);
        }
        return this.voterRepository.save(voter);
    }

    /**
     * 投票
     * @param electionId 选举id
     * @param candidateIdCard 候选人身份证号
     * @param voterIdCard 投票人身份证号
     */
    async vote(electionId: string, candidateIdCard: string, voterIdCard: string): Promise<boolean> {
        let voteDetail = new VoteDetail(voterIdCard, candidateIdCard, electionId);
        let result = await this.voteDetailRepository.save(voteDetail)
        return !!result;
    }

    /**
     * 获取指定选举id的选举详情
     * @param electionId 选举id
     */
    async getElection(electionId: string): Promise<ElectionDetail> {
        return this.electionRepository.findOne(electionId);
    }

    /**
     * 查询选举结果
     * @param electionId 选举id
     * @returns 返回选举结果
     */
    async queryVoteNumber(electionId: string): Promise<Array<VoteResultModel>> {

        let arr: Array<VoteResultModel> = new Array();
        // 查询出此场选举有多少个候选人
        let electionInfo = await this.electionRepository.findOne(electionId);
        if (electionInfo && electionInfo.candidateIds && electionInfo.candidateIds.length > 0) {
            for (const item of electionInfo.candidateIds) {
                // 按候选人count出票数
                let count = await this.voteDetailRepository.count({ candidateId: item, electionId: electionId });
                let candidate = await this.candidateRepository.findOne(item);
                arr.push({ candidateName: candidate.name, count: count, electionId: electionId });
            }
        }
        return arr;
    }
}
