import { ApiProperty } from "@nestjs/swagger";

/**
 * 投票结果
 */
export class VoteResultModel {
    /**
     * 候选人姓名
     */
    @ApiProperty({ description: '候选人姓名' })
    candidateName: string;
    /**
     * 票数
     */
    @ApiProperty({ description: '票数' })
    totalCount: number;
    /**
     * 选举id
     */
    @ApiProperty({ description: '选举id' })
    electionId: string

}