import {CanActivate, ExecutionContext, mixin, Type} from "@nestjs/common";
import {Role} from "../../authorization/authorization.constants";
import {Observable} from "rxjs";
import {JwtGuard} from "./jwt.guard";
import {JwtPayload} from "../../authorization/types/jwt-payload.type";

const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin extends JwtGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context)

            const request = context.switchToHttp().getRequest()
            const user = request.user

            return user?.role === role
        }
    }

    return mixin(RoleGuardMixin)
}

export default RoleGuard