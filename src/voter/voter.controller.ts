import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseCodeEnum } from 'src/shared/response-code.enum';
import { ResponseModel } from 'src/shared/response-model';
import { VoteModel } from 'src/shared/vote-model';
import { VoteResultModel } from 'src/shared/vote-result-model';
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
    @HttpCode(200)
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
}
