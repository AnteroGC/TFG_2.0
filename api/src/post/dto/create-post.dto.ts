import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { Category } from "src/category/entities/category.entity";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    tittle: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    mainImageUrl: string;

    @IsOptional()
    category: Category;

    @IsOptional()
    user: User;

    @IsOptional()
    @IsString()
    song: string;
}
