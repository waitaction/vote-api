import { ApiProperty } from "@nestjs/swagger";
import { Voter } from "src/entity/Voter";
import { VoteResultModel } from "./vote-result-model";

/**
 * 投票结果
 */
export class VoteDetailResultModel extends VoteResultModel {

    /**
     * 候选人身份证号
     */
    @ApiProperty({ description: '候选人身份证号' })
    candidateIdCard: string;
    /**
     * 投票的用户
     */
    @ApiProperty({ description: '投票的用户' })
    voters: Array<Voter>;

}