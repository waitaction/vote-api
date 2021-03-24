import { ResponseCodeEnum } from './../shared/response-code.enum';
import { ElectionModel } from './../shared/election-model';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ElectionDetail } from '../entity/ElectionDetail';
import { ElectionService } from './election.service';
import { ResponseModel } from '../shared/response-model';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StartEndElectionModel } from '../shared/start-end-election-model';
import { ElectionStateEnum } from '../shared/election-state.enum';

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
    @ApiOperation({ summary: '现在开始一场选举' })
    @ApiBearerAuth()
    @Post('start-election')
    @HttpCode(200)
    async startElection(startElection: StartEndElectionModel): Promise<ResponseModel<ElectionDetail>> {
        let election = await this.electionService.changeElectionState(startElection.electionId, ElectionStateEnum.START);
        if (election) {
            return new ResponseModel<ElectionDetail>(ResponseCodeEnum.SUCCESS, election);
        } else {
            return new ResponseModel<ElectionDetail>(ResponseCodeEnum.FAIL, null);
        }
    }

    @ApiOperation({ summary: '现在结束一场选举' })
    @ApiBearerAuth()
    @Post('end-election')
    @HttpCode(200)
    async endElection(endElection: StartEndElectionModel): Promise<ResponseModel<ElectionDetail>> {
        let election = await this.electionService.changeElectionState(endElection.electionId, ElectionStateEnum.START);
        if (election) {
            return new ResponseModel<ElectionDetail>(ResponseCodeEnum.SUCCESS, election);
        } else {
            return new ResponseModel<ElectionDetail>(ResponseCodeEnum.FAIL, null);
        }
    }
}
