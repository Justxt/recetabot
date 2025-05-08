import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Recipe } from './interfaces/recipe.interface';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { v4 as uuidv4 } from 'uuid';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(private readonly categoriesService: CategoriesService) {}

  private validateRecipeName(name: string): void {
    if (name.toLowerCase() === 'forbidden') {
      throw new BadRequestException('Recipe name cannot be "Forbidden".');
    }
  }

  private checkCategoryExists(categoryId: string): void {
    try {
      this.categoriesService.findOne(categoryId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(
          `Category with ID "${categoryId}" not found. Cannot create/update recipe.`,
        );
      }
      throw error;
    }
  }

  findAll(): Recipe[] {
    return this.recipes;
  }

  findOne(id: string): Recipe {
    const recipe = this.recipes.find((item) => item.id === id);
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID "${id}" not found`);
    }
    return recipe;
  }

  create(createRecipeDto: CreateRecipeDto): Recipe {
    this.validateRecipeName(createRecipeDto.name);
    this.checkCategoryExists(createRecipeDto.categoryId);

    const newRecipe: Recipe = {
      id: uuidv4(),
      ...createRecipeDto,
    };
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  update(id: string, updateRecipeDto: UpdateRecipeDto): Recipe {
    const recipe = this.findOne(id);
    if (updateRecipeDto.name) {
      this.validateRecipeName(updateRecipeDto.name);
    }
    if (updateRecipeDto.categoryId) {
      this.checkCategoryExists(updateRecipeDto.categoryId);
    }

    const updatedRecipe = { ...recipe, ...updateRecipeDto };
    this.recipes = this.recipes.map((item) =>
      item.id === id ? updatedRecipe : item,
    );
    return updatedRecipe;
  }

  remove(id: string): void {
    const initialLength = this.recipes.length;
    this.recipes = this.recipes.filter((item) => item.id !== id);
    if (this.recipes.length === initialLength) {
      throw new NotFoundException(`Recipe with ID "${id}" not found`);
    }
  }
}
