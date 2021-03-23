import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Tool } from 'src/lib/tool';
import { ResponseCodeEnum } from 'src/shared/response-code.enum';
import { ResponseModel } from 'src/shared/response-model';
import { VoteModel } from 'src/shared/vote-model';
import { VoterService } from './voter.service';

@Controller('voter')
export class VoterController {
    constructor(
        public voterService: VoterService
    ) {

    }


    @ApiOperation({ summary: '投票' })
    @Post('vote')
    @HttpCode(200)
    async vote(@Body() para: VoteModel): Promise<ResponseModel<boolean>> {
        // 登记或者更新投票人信息，再投票

        if (!Tool.validateIdCardHk(para.idCard)) {
            return new ResponseModel<boolean>(ResponseCodeEnum.FAIL, false, "请输入正确的香港身份证号");
        } else {
            const result = await this.voterService.vote(para.electionId, para.candidateId, para.idCard);
            if (result) {
                return new ResponseModel<boolean>(ResponseCodeEnum.SUCCESS, result);
            } else {
                return new ResponseModel<boolean>(ResponseCodeEnum.FAIL, result);
            }
        }
    }
}
