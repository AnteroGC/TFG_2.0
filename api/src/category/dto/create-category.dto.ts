import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    tittle: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}
