import {IsString} from "class-validator";

export class DryCleaningIdDto {

    @IsString()
    dryCleaningId: string
}