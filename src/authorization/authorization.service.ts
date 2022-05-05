import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {RegisterDto} from "./dto/register.dto";
import {Tokens} from "./types/token.type";
import {JwtService} from "@nestjs/jwt";

import * as bcrypt from 'bcrypt'
import {LoginDto} from "./dto/login.dto";
import {MailService} from "../mail/mail.service";
import {ResendEmailDto} from "./dto/resend-email.dto";

@Injectable()
export class AuthorizationService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) {}

    public async registerLocal(registerDto: RegisterDto): Promise<Tokens> {
        const user = await this.userService.findByEmail(registerDto.email);

        if (user) throw new BadRequestException({ error: 'User email exist!' })

        const newUser = await this.userService.create({
            name: registerDto.name,
            surname: registerDto.surname,
            email: registerDto.email,
            password: registerDto.password
        })

        const tokens = await this.getTokens(newUser._id, newUser.email, newUser.role)
        await this.updateRefresh(newUser._id, tokens.refresh_token)
        return tokens
    }

    public async loginLocal(loginDto: LoginDto): Promise<Tokens> {
        const { email, password } = loginDto
        const user = await this.userService.findByEmailWithPassword(email)

        if (!user) throw new ForbiddenException({ error: 'Access Denied' })

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) throw new ForbiddenException({ error: 'Access Denied' })

        const tokens = await this.getTokens(user._id, user.email, user.role)
        await this.updateRefresh(user._id, tokens.refresh_token)
        return tokens
    }

    public async logout(userId: string) {
        await this.userService.updateUserRefresh(userId)
        return true
    }

    public async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
        const user = await this.userService.findByIdWithRefresh(userId)
        if (!user || !user.refresh) throw new ForbiddenException({ error: 'Access Denied' })

        const refreshTokensMatches = bcrypt.compare(refreshToken, user.refresh)
        if (!refreshTokensMatches) throw new ForbiddenException({ error: 'Access Denied' })

        const tokens = await this.getTokens(user._id, user.email, user.role)
        await this.updateRefresh(user._id, tokens.refresh_token)
        return tokens
    }

    public async updateRefresh(userId: string, refreshToken: string) {
        const hash = await bcrypt.hash(refreshToken, 10)
        await this.userService.update(userId, {
            refresh: hash
        })
    }

    public async getTokens(id: string, email: string, role: string): Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                    sub: id,
                    email,
                    role
                }, {
                    secret: process.env.ACCESS_TOKEN_SECRET,
                    expiresIn: 60 * 15,
                }
            ),
            this.jwtService.signAsync({
                    sub: id,
                    email,
                    role
                }, {
                    secret: process.env.REFRESH_TOKEN_SECRET,
                    expiresIn: 60 * 60 * 24 * 7,
                }
            )
        ])

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    public async forgotPassword(resendEmailDto: ResendEmailDto): Promise<void> {
        const { email } = resendEmailDto

        const user = await this.userService.findByEmail(email)
        if (!user) throw new NotFoundException({
            message: 'User with this email does not exist'
        })

        const { access_token } = await this.getTokens(user._id, user.email, user.role)

        await this.mailService.sendForgotPasswordConfirmation(user, access_token)
    }
}