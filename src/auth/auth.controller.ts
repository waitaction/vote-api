import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccountModel } from 'src/shared/account-model';
import { TokenInfo } from 'src/shared/token-info.interface';
import { AuthService } from './auth.service';

@ApiTags('用户权限')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: '用户登录' })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() accountModel: AccountModel): Promise<TokenInfo> {
        return this.authService.login(accountModel.userName, accountModel.password);
    }
}
