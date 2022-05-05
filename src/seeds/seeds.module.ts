import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import {AdminSeed} from "./admin.seed";
import {UserModule} from "../user/user.module";

@Module({
    imports: [CommandModule, UserModule],
    providers: [AdminSeed],
    exports: [AdminSeed]
})
export class SeedsModule {}