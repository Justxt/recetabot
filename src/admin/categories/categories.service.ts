import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    { id: '1', name: 'Appetizers' },
    { id: '2', name: 'Main Courses' },
    { id: '3', name: 'Desserts' },
  ];

  findAll(): Category[] {
    return this.categories;
  }

  findOne(id: string): Category {
    const category = this.categories.find((cat) => cat.id === id);
    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return category;
  }

  create(createCategoryDto: CreateCategoryDto): Category {
    const newCategory: Category = {
      id: uuidv4(),
      ...createCategoryDto,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto): Category {
    const category = this.findOne(id);
    const updatedCategory = { ...category, ...updateCategoryDto };
    this.categories = this.categories.map((cat) =>
      cat.id === id ? updatedCategory : cat,
    );
    return updatedCategory;
  }

  remove(id: string): void {
    const initialLength = this.categories.length;
    this.categories = this.categories.filter((cat) => cat.id !== id);
    if (this.categories.length === initialLength) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }
}
