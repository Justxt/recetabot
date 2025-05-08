import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [CategoriesModule, RecipesModule],
})
export class AdminModule {}
