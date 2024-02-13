import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CategoryDTO } from './category.dto';
import { CreateCategoryDTO } from './create-category.dto';
import { Category } from './category.entity';
import { MonetaryTransaction } from './monetary-transaction.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        @InjectRepository(MonetaryTransaction)
        private transactionsRepository: Repository<MonetaryTransaction>
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
        return this.categoriesRepository.find({order: {name: "ASC"}});
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
        return this.categoriesRepository.findOneBy({ id }).then(categoryFound => {
            if (!categoryFound) {
                throw new ConflictException("category does not exist");
            } else {
                return this.transactionsRepository.exist({
                    where: {
                        category: categoryFound,
                    }
                }).then(exists => {
                    if (exists) {
                        throw new ConflictException("category is associated with transactions");
                    } else {
                        return this.categoriesRepository.delete(id);
                    }
                })
            }
        });
    }
}
