import { PartialType } from '@nestjs/mapped-types';
import { CreateUserFollowerDto } from './create-user-follower.dto';
import { IsNotEmpty, IsNumber } from "class-validator";
import { User } from "src/auth/entities/user.entity";


export class UpdateUserFollowerDto extends PartialType(CreateUserFollowerDto) {

}
