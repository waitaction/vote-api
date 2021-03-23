import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ElectionDetail } from 'src/entity/ElectionDetail';
import { ElectionService } from './election.service';

@Controller('election')
@UseGuards(AuthGuard('jwt'))
export class ElectionController {
    constructor(
        public electionService: ElectionService
    ) {

    }
    @Post('createElection')
    @HttpCode(200)
    async createElection(@Body() para: { beginTime: number, endTime: number }): Promise<ElectionDetail> {
        const result = await this.electionService.createElection(para.beginTime, para.endTime);
        return result;
    }

}
