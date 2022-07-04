import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly repo: Repository<Category>) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    Object.assign(category, createCategoryDto);

    this.repo.create(category);
    return await this.repo.save(category);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    return await this.repo.findOne(+id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category) {
      throw new BadRequestException('Categoria no encontrada');
    }

    Object.assign(category, updateCategoryDto);
    return await this.repo.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);

    if (!category) {
      throw new BadRequestException('Categoria no encontrada');
    }

    try {
      return await this.repo.remove(category);
     

    } catch (err) {
      throw new BadRequestException('No se ha podido borrar');
    }
  }
}