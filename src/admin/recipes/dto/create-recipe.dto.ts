import { IsNotEmpty, IsString, MinLength, IsUUID } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID('4', { message: 'categoryId must be a valid UUID' })
  categoryId: string;
}
