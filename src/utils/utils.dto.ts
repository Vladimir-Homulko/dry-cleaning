import {ApiProperty} from "@nestjs/swagger";

export class PaginationDto {

    @ApiProperty()
    skip: number = 0

    @ApiProperty()
    limit: number
}