import { ApiProperty } from "@nestjs/swagger";

/**
 * 投票
 */
export class VoteModel {

    /**
     * 投票人身份证号(香港)
     */
    @ApiProperty({ description: '投票人身份证号(香港)' })
    idCard: string;

    /**
     * 投票人邮箱
     */

    @ApiProperty({ description: '投票人邮箱' })
    email: string;

    /**
     * 选举id
     */
    @ApiProperty({ description: '选举id' })
    electionId: string;

    /**
     * 候选人身份证号
     */
    @ApiProperty({ description: '候选人身份证号' })
    candidateId: string;
}