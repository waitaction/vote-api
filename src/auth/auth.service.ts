import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';
import { JwtPayload } from '../shared/jwt-payload.interface';
import { XApiExceptionCode } from '../shared/api-exception-code';
import { TokenInfo } from '../shared/token-info.interface';

@Injectable()
export class AuthService {
    user: User;
    expires: number = 3600;
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async createToken(id: string): Promise<any> {
        const user: JwtPayload = { id: id };
        return jwt.sign(user, 'secretKey', { expiresIn: this.expires });
    }

    async validateAccount(payload: JwtPayload): Promise<any> {
        return this.userRepository.findOne(payload.id);
    }

    async findUserByAccount(userName: string): Promise<User> {
        return this.userRepository.findOne({ userName: userName });
    }


    /**
     * 登录
     * @param userName 用户名
     * @param password 密码
     * @returns 返回密码信息
     */
    async login(userName: string, password: string): Promise<TokenInfo> {
        this.user = await this.userRepository.findOne({ userName: userName });
        if (this.user == null && userName == "admin") {
            this.user = await this.createDefaultAccount();
        }
        if (this.user != undefined && this.user.pwd == password) {
            let isManager = await this.isManager(this.user);
            return new Promise((resolve, reject) => {
                this.createToken(this.user.id.toString())
                    .then(result => resolve({ userName: this.user.userName, token: result, isManager: isManager }))
                    .catch(error => reject(error));
            });
        } else {
            throw new HttpException(XApiExceptionCode.USER_ACCOUNT_PASSWORD_INVALID, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 判断是否是管理员
     * @param user 用户信息
     * @returns 返回是否是管理员
     */
    async isManager(user: User): Promise<boolean> {
        return !!user.isManager;
    }

    /**
     * 创建默认帐号(仅用于演示)
     */
    async createDefaultAccount(): Promise<User> {
        let user = await this.userRepository.findOne({ userName: 'admin' });
        if (user == null) {
            let defaultUser = new User("admin", "admin", true);
            return this.userRepository.save(defaultUser);
        }
    }
}
