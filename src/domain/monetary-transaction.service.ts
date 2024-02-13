import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonetaryTransaction } from './monetary-transaction.entity';
import { CreateMonetaryTransactionDTO } from './create-monetary-transaction.dto';
import { MonetaryTransactionDTO } from './monetary-transaction.dto';
import { Category } from './category.entity';

@Injectable()
export class MonetaryTransactionService {
    constructor(
        @InjectRepository(MonetaryTransaction)
        private transactionsRepository: Repository<MonetaryTransaction>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) { }

    create(transaction: CreateMonetaryTransactionDTO): Promise<MonetaryTransaction> {
        return this.validateData(transaction).then(transaction => this.transactionsRepository.save(transaction));
    }

    async validateData(transaction: CreateMonetaryTransactionDTO): Promise<CreateMonetaryTransactionDTO> {
        const result = new Promise<CreateMonetaryTransactionDTO>((resolve, reject) => {
            if (!transaction.category) {
                return reject('missing category id');
            }
            return this.categoriesRepository.exist({
                where: {
                    id: transaction.category.id
                }
            }).then(exists => {
                if (!exists) {
                    return reject('category id not found');
                } else {
                    return resolve(transaction);
                }
            });
        });
        return result;
    }

    findAll() {
        return this.transactionsRepository.find();
    }

    findOne(id: number) {
        return this.transactionsRepository.findOneBy({ id });
    }

    update(id: number, transaction: MonetaryTransactionDTO) {
        transaction.id = id
        return this.validateData(transaction).then((transaction) => this.transactionsRepository.save(transaction));
    }

    remove(id: number) {
        return this.transactionsRepository.delete(id);
    }
}
