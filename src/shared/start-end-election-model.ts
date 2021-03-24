import { ApiProperty } from "@nestjs/swagger";

/**
 * 开始或结束选举model
 */
export class StartEndElectionModel {

    @ApiProperty({ description: '选择id' })
    electionId: string;

}