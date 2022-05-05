import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AdminService} from "../user/admin.service";
import {Command} from "nestjs-command";

@Injectable()
export class AdminSeed {

    constructor(
        private readonly adminService: AdminService
    ) {}

    @Command({ command: 'create:admin', describe: 'create admin' })
    async createAdmin() {
        await this.adminService.create({
            name: 'Admin',
            surname: 'Admin',
            email: 'admin@gmail.com',
            password: 'nmKZz9VNC10r78sC',
            role: 'ADMIN'
        })
    }
}