import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Candidate } from 'src/entity/Candidate';
import { Tool } from 'src/lib/tool';
import { CandidateModel } from 'src/shared/candidate-model';
import { ResponseCodeEnum } from 'src/shared/response-code.enum';
import { ResponseModel } from 'src/shared/response-model';
import { CandidateService } from './candidate.service';

/**
 * 候选人 api
 */
@ApiTags("候选人")
@Controller('candidate')
@UseGuards(AuthGuard('jwt'))
export class CandidateController {
    constructor(
        public candidateService: CandidateService
    ) {

    }

    @ApiOperation({ summary: '添加一个候选人到系统' })
    @ApiBearerAuth()
    @Post('add-candidate')
    @HttpCode(200)
    async addCandidate(@Body() para: CandidateModel): Promise<ResponseModel<Candidate>> {
        //效验身份证号
        if (!Tool.validateIdCardHk(para.idCard)) {
            return new ResponseModel<Candidate>(ResponseCodeEnum.FAIL, null, "请输入正确的香港身份证号");
        } else {
            const candidate = await this.candidateService.saveCandidate(para.idCard, para.name);
            if (candidate) {
                return new ResponseModel<Candidate>(ResponseCodeEnum.SUCCESS, candidate);
            } else {
                return new ResponseModel<Candidate>(ResponseCodeEnum.FAIL, null);
            }
        }
    }

    @ApiOperation({ summary: '查询系统中的候选人' })
    @ApiBearerAuth()
    @Get('query-candidate/:idCard')
    @HttpCode(200)
    async queryCandidate(@Param("idCard") idCard: string): Promise<ResponseModel<Candidate>> {
        let result = await this.candidateService.getCandidate(idCard);
        if (result) {
            return new ResponseModel<Candidate>(ResponseCodeEnum.SUCCESS, result);
        } else {
            return new ResponseModel<Candidate>(ResponseCodeEnum.FAIL, null, "未查询到候选人信息");
        }
    }
}
