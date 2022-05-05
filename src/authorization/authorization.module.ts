import {Module} from "@nestjs/common";
import {AuthorizationController} from "./authorization.controller";
import {AuthorizationService} from "./authorization.service";
import {UserModule} from "../user/user.module";
import {AccessTokenStrategy} from "./strategies/access-token.strategy";
import {RefreshTokenStrategy} from "./strategies/refresh-token.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [UserModule, JwtModule.register({})],
    controllers: [AuthorizationController],
    providers: [AuthorizationService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthorizationModule {}