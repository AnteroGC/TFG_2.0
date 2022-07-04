import { IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/auth/entities/user.entity";

export class CreateUserFollowerDto {

    @IsNotEmpty()
    following_id: string;

    @IsNotEmpty()
    follower_id: string;
}
