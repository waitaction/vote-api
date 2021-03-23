import { ApiProperty } from "@nestjs/swagger";

export class AccountModel {

    @ApiProperty({ description: '用户名' })
    userName: string;
    @ApiProperty({ description: '密码' })
    password: string;
}