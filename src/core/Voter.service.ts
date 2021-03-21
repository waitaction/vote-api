import { Injectable } from '@nestjs/common';
import { Voter } from '../entity/Voter';

/**
 * 投票的用户
 */
@Injectable()
export class VoterService {
    /**
     * 登记投票的用户
     * @param voter 投票用户
     */
    createVoter(voter: Voter): Promise<Voter> { }
    
    /**
     * 投票
     */
    vote(){

    }
}