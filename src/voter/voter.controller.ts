import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ResponseCodeEnum } from '../shared/response-code.enum';
import { ResponseModel } from '../shared/response-model';
import { VoteDetailResultModel } from '../shared/vote-detail-result-model';
import { VoteModel } from '../shared/vote-model';
import { VoteResultModel } from '../shared/vote-result-model';
import { VoterService } from './voter.service';

@ApiTags("投票")
@Controller('voter')
export class VoterController {
    constructor(
        public voterService: VoterService,
    ) {

    }


    /**
     * 用户投票(⽤⼾在投票之後可以⼀次性⾒到當時的選舉實時狀態)
     * @param para 投票参数
     * @returns 返回选举实时信息 (候选人实时票数)
     */
    @ApiOperation({ summary: '投票人投票' })
    @Post('vote')
    @HttpCode(HttpStatus.OK)
    async vote(@Body() para: VoteModel): Promise<ResponseModel<Array<VoteResultModel>>> {
        // 登记或者更新投票人信息，再投票
        await this.voterService.saveVoter(para.email, para.idCard);
        let election = await this.voterService.getElection(para.electionId);
        if (election.valid) {
            // 选举进行中
            if (election.beginTime <= (new Date().getTime()) && election.endTime >= (new Date().getTime())) {

                // 获取选举详情
                const result = await this.voterService.vote(para.electionId, para.candidateId, para.idCard);
                if (result) {
                    //查询投票结果实时状态
                    let voteResult = await this.voterService.queryVoteNumber(para.electionId);
                    return new ResponseModel<Array<VoteResultModel>>(ResponseCodeEnum.SUCCESS, voteResult);
                } else {
                    return new ResponseModel<Array<VoteResultModel>>(ResponseCodeEnum.FAIL, null, "投票失败");
                }
            } else {
                // 选举已结束
                return new ResponseModel<Array<VoteResultModel>>(ResponseCodeEnum.VOTE_END, null, "选举未开始或已结束");
            }
        } else {
            // 选举已停止
            return new ResponseModel<Array<VoteResultModel>>(ResponseCodeEnum.VOTE_END, null, "选举已停止");
        }
    }


    /**
     * 查询选举的实时票数和投票的用户
     * @param electionId 选举id
     */

    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: '查询选举的实时票数和投票的用户' })
    @ApiParam({ name: "electionId", description: '选举id' })
    @ApiParam({ name: "candidateId", description: '候选人id' })
    @ApiParam({ name: "page", description: '页数' })
    @ApiParam({ name: "pageSize", description: '每页显示数量' })
    @Get('query-vote-number/:electionId/:candidateId/:page/:pageSize')
    @HttpCode(HttpStatus.OK)
    async queryVoteNumber(
        @Param("electionId") electionId: string,
        @Param("candidateId") candidateId: string,
        @Param("page") page: string,
        @Param("pageSize") pageSize: string
    ): Promise<ResponseModel<Array<VoteDetailResultModel>>> {
        let voteResult = await this.voterService.queryVoteDetailNumber(electionId, candidateId, parseInt(page), parseInt(pageSize));
        if (voteResult) {
            return new ResponseModel<Array<VoteDetailResultModel>>(ResponseCodeEnum.SUCCESS, voteResult);
        } else {
            return new ResponseModel<Array<VoteDetailResultModel>>(ResponseCodeEnum.FAIL, null, "查询失败");
        }
    }
}
