import { ResponseCodeEnum } from './../shared/response-code.enum';
import { ElectionModel } from './../shared/election-model';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ElectionDetail } from 'src/entity/ElectionDetail';
import { ElectionService } from './election.service';
import { ResponseModel } from 'src/shared/response-model';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("选举")
@Controller('election')
@UseGuards(AuthGuard('jwt'))
export class ElectionController {
    constructor(
        public electionService: ElectionService
    ) {

    }

    @ApiOperation({ summary: '添加一场选举' })
    @ApiBearerAuth()
    @Post('create-election')
    @HttpCode(200)
    async createElection(@Body() para: ElectionModel): Promise<ResponseModel<ElectionDetail>> {
        if (para.candidateIds && para.candidateIds.length >= 2) {
            const election = await this.electionService.createElection(para);
            if (election) {
                return new ResponseModel<ElectionDetail>(ResponseCodeEnum.SUCCESS, election);
            } else {
                return new ResponseModel<ElectionDetail>(ResponseCodeEnum.FAIL, null);
            }
        } else {
            return new ResponseModel<ElectionDetail>(ResponseCodeEnum.FAIL, null, "候选人需要至少两个人");
        }
    }

}
