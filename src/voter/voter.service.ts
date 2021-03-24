import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from '../entity/Candidate';
import { ElectionDetail } from '../entity/ElectionDetail';
import { VoteDetail } from '../entity/VoteDetail';
import { Tool } from '../lib/tool';
import { VoteDetailResultModel } from '../shared/vote-detail-result-model';
import { VoteResultModel } from '../shared/vote-result-model';
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
                arr.push({ candidateName: candidate.name, totalCount: count, electionId: electionId });
            }
        }
        return arr;
    }


    /**
     * 查询指定候选人的投票的用户
     * @param electionId 选举id
     * @param candidateId 候选人id
     * @returns 返回选举结果
     */
    async queryVoteDetailNumber(electionId: string, candidateId: string, page: number, pageSize: number): Promise<Array<VoteDetailResultModel>> {

        let arr: Array<VoteDetailResultModel> = new Array();
        // 查询出此场选举有多少个候选人
        let electionInfo = await this.electionRepository.findOne(electionId);
        if (electionInfo && electionInfo.candidateIds && electionInfo.candidateIds.length > 0) {
            let cId = electionInfo.candidateIds.find(m => m == candidateId);
            if (cId == null) {
                throw new Error("候选人不在这场选举");
            } else {
                let candidate = await this.candidateRepository.findOne(cId);
                let voteList = await this.voteDetailRepository.find({ candidateId: cId, electionId: electionId });
                let pagedVoteList = this.paged(voteList, page, pageSize);
                let voterIdCards = pagedVoteList.map((value) => value.voterIdCard)
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

    /**
     * 分页
     */
    paged(arr: Array<any>, page: number, pageSize: number): Array<any> {
        let start = ((page - 1) * pageSize);
        if (arr.length < start) {
            return [];
        }
        let list = [];
        for (let index = start; index < (arr.length > pageSize ? pageSize : arr.length); index++) {
            const element = arr[index];
            list.push(element);
        }
        return list;
    }
}
