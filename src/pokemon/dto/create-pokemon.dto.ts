import { IsInt, IsPositive, Min, IsString, MinLength, IsDefined } from "class-validator";

export class CreatePokemonDto {
    @IsInt()
    @IsPositive()
    @Min(1)

    no:number;
    // isstring,minlength 1 required
    @IsString()
    @MinLength(3)
    name: string;
}
