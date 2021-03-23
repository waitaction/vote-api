import { ApiProperty } from "@nestjs/swagger";

/**
 * 身份证
 */
export class CandidateModel {
    /**
     * 香港⾝分證號格式為：字⺟+6位數字+括號內1位數字，例如:A123456(7)
     */
    @ApiProperty({ description: '身份证号' })
    idCard: string;
    @ApiProperty({ description: '姓名' })
    name: string;
}