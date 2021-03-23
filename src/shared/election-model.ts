import { ApiProperty } from "@nestjs/swagger";

/**
 * 选举
 */
export class ElectionModel {

    @ApiProperty({ description: '选举开始时间' })
    beginTime: number;

    @ApiProperty({ description: '选举结束时间' })
    endTime: number;
    @ApiProperty({ description: '候选人' })
    candidateIds: Array<string>;
}