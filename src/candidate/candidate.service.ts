import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from '../entity/Candidate';

/**
 * 候选人
 */
@Injectable()
export class CandidateService {

    constructor(
        @InjectRepository(Candidate)
        public readonly candidateRepository: Repository<Candidate>) {

    }

    /**
     * 添加候选人到系统
     * @param name 姓名
     * @param idCard 身份证号
     * @returns 返回候选人信息
     */
    addCandidate(idCard: string, name: string): Promise<Candidate> {
        let candidate = new Candidate(idCard, name);
        return this.candidateRepository.save(candidate);
    }
}
