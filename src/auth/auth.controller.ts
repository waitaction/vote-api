import { ResponseCodeEnum } from './../shared/response-code.enum';
import { ResponseModel } from './../shared/response-model';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccountModel } from '../shared/account-model';
import { TokenInfo } from '../shared/token-info.interface';
import { AuthService } from './auth.service';

@ApiTags('用户权限')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: '用户登录' })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() accountModel: AccountModel): Promise<ResponseModel<TokenInfo>> {
        let tokenInfo = await this.authService.login(accountModel.userName, accountModel.password);
        if (tokenInfo) {
            return new ResponseModel<TokenInfo>(ResponseCodeEnum.SUCCESS, tokenInfo);
        } else {
            return new ResponseModel<TokenInfo>(ResponseCodeEnum.FAIL, null, "登录失败");
        }
    }
}
