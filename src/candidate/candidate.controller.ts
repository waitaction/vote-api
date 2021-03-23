import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { Candidate } from 'src/entity/Candidate';
import { Tool } from 'src/lib/tool';
import { CandidateModel } from 'src/shared/candidate-model';
import { ResponseCodeEnum } from 'src/shared/response-code.enum';
import { ResponseModel } from 'src/shared/response-model';
import { CandidateService } from './candidate.service';

/**
 * 候选人 api
 */
@Controller('candidate')
@UseGuards(AuthGuard('jwt'))
export class CandidateController {
    constructor(
        public candidateService: CandidateService
    ) {

    }

    @ApiOperation({ summary: '添加一个候选人' })
    @ApiHeader({ name: 'Authorization', required: true, description: 'Bearer token' })
    @Post('addCandidate')
    @HttpCode(200)
    async addCandidate(@Body() para: CandidateModel): Promise<ResponseModel<Candidate>> {
        //效验身份证号
        if (!Tool.validateIdCardHk(para.idCard)) {
            return new ResponseModel<Candidate>(ResponseCodeEnum.FAIL, null, "请输入正确的香港身份证号");
        } else {
            const candidate = await this.candidateService.addCandidate(para.idCard, para.name);
            if (candidate) {
                return new ResponseModel<Candidate>(ResponseCodeEnum.SUCCESS, candidate);
            } else {
                return new ResponseModel<Candidate>(ResponseCodeEnum.FAIL, null);
            }
        }
    }
}
