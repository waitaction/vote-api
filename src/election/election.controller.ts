import { ResponseCodeEnum } from './../shared/response-code.enum';
import { ElectionModel } from './../shared/election-model';
import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ElectionDetail } from 'src/entity/ElectionDetail';
import { ElectionService } from './election.service';
import { ResponseModel } from 'src/shared/response-model';
import { ApiOperation } from '@nestjs/swagger';

@Controller('election')
@UseGuards(AuthGuard('jwt'))
export class ElectionController {
    constructor(
        public electionService: ElectionService
    ) {

    }

    @ApiOperation({ summary: '新增一个选举' })
    @Post('createElection')
    @HttpCode(200)
    async createElection(@Body() para: ElectionModel): Promise<ResponseModel<ElectionDetail>> {
        const election = await this.electionService.createElection(para);
        if (election) {
            return new ResponseModel<ElectionDetail>(ResponseCodeEnum.SUCCESS, election);
        } else {
            return new ResponseModel<ElectionDetail>(ResponseCodeEnum.FAIL, null);
        }
    }

}
