
import { Injectable } from '@nestjs/common';
import { Candidate } from '../entity/Candidate';

/**
 * 候选人
 */
@Injectable()
export class CandidateService {

    /**
     * 创建候选人
     */
    createCandidate(candidate: Candidate): Promise<Candidate> {

    }
}