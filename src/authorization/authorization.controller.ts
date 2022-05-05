import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards} from "@nestjs/common";
import {AuthorizationService} from "./authorization.service";
import {RegisterDto} from "./dto/register.dto";
import {Tokens} from "./types/token.type";
import {LoginDto} from "./dto/login.dto";
import {GetCurrentUserId} from "../common/decorators/get-current-user-id.decorator";
import {GetCurrentUser} from "../common/decorators/get-current-user-data.decorator";
import {Public} from "../common/decorators/public.decorator";
import {RefreshJwtGuard} from "../common/guards/refresh-jwt.guard";
import {ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import {ResendEmailDto} from "./dto/resend-email.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthorizationController {

    constructor(
        private readonly authService: AuthorizationService
    ) {}

    @ApiResponse({ description: 'Register client' })
    @Public()
    @Post('local/register')
    @HttpCode(HttpStatus.CREATED)
    public registerLocal(@Body() registerDto: RegisterDto): Promise<Tokens> {
        return this.authService.registerLocal(registerDto)
    }

    @ApiResponse({
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: 'string'
                },
                refresh_token: {
                    type: 'string'
                }

            }
        }
    })
    @Public()
    @Post('local/login')
    @HttpCode(HttpStatus.OK)
    public loginLocal(@Body() loginDto: LoginDto): Promise<Tokens> {
        return this.authService.loginLocal(loginDto)
    }

    @ApiResponse({
        schema: {
            type: 'boolean'
        }
    })
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    public logout(@GetCurrentUserId() id: string) {
        return this.authService.logout(id)
    }

    @ApiResponse({
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: 'string'
                },
                refresh_token: {
                    type: 'string'
                }

            }
        }
    })
    @ApiBearerAuth('refresh-token')
    @Public()
    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    public refreshTokens(
        @GetCurrentUserId() id: string,
        @GetCurrentUser('refreshToken') token
    ) {
        return this.authService.refreshTokens(id, token)
    }

    @Public()
    @Post('forgotPassword')
    public async forgotPassword(@Query() resendEmailDto: ResendEmailDto) {
        await this.authService.forgotPassword(resendEmailDto)

        return { message: `Email sent to ${resendEmailDto.email}, checkout your email inbox to reset your password` }
    }

    @Get('reset-password/:token')
    public async resetPassword(@Param() token: string) {
        return { access_token: token }
    }
}