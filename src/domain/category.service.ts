import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CategoryDTO } from './category.dto';
import { CreateCategoryDTO } from './create-category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) { }

    create(category: CreateCategoryDTO) {
        return this.categoriesRepository.exist({
            where: {
                name: category.name
            }
        }).then(exists => {
            if (!exists) {
                return this.categoriesRepository.save(category);
            } else {
                throw new ConflictException("category with same name already exists");
            }
        });
    }

    findAll() {
        return this.categoriesRepository.find();
    }

    findOne(id: number) {
        return this.categoriesRepository.findOneBy({ id });
    }

    update(id: number, category: CategoryDTO) {
        return this.categoriesRepository.exist({
            where: {
                name: category.name,
                id: Not(id)
            }
        }).then(exists => {
            if (!exists) {
                return this.categoriesRepository.update(id, category);
            } else {
                throw new ConflictException("category with same name already exists");
            }
        });
    }

    remove(id: number) {
        return this.categoriesRepository.delete(id);
    }
}
