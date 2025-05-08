import { IsOptional, IsString, MinLength, IsUUID } from 'class-validator';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsUUID('4', { message: 'categoryId must be a valid UUID' })
  categoryId?: string;
}
