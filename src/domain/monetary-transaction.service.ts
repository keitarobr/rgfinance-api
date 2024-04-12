import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonetaryTransaction } from './monetary-transaction.entity';
import { CreateMonetaryTransactionDTO } from './create-monetary-transaction.dto';
import { MonetaryTransactionDTO } from './monetary-transaction.dto';
import { Category } from './category.entity';
import { truncate } from 'fs';
import { CategoryDTO } from './category.dto';
import { of } from 'rxjs';
import { CategoryService } from './category.service';
import { Tracing } from 'trace_events';

@Injectable()
export class MonetaryTransactionService {

    async parseTransaction(transactionLine: string, dateFormat: string):Promise<CreateMonetaryTransactionDTO> {        
        const parts = transactionLine.split(";");
        Logger.log(transactionLine);
        if (parts.length !== 3) {
            return null;
        }
        const date: Date = this.parseDate(parts[0], dateFormat)
        let category = await this.parseCategory(parts[1]);                
        const value:number = this.parseValue(parts[2])
        
        if (date && category && value) {
            const res = {category: category, date: date, value: value} as CreateMonetaryTransactionDTO;
            Logger.log(res);
            return res;
        } else {
            Logger.log("Could not find category: " + category);
        }
    }

    async parseCategory(name: string): Promise<CategoryDTO> {
        return this.categoriasService.locateClosest(name);
    }

    parseValue(value: string): number {
        return parseFloat(value);
    }
    parseDate(dateString: string, dateFormat: string): Date {
        let parts = dateString.split("/");

        if (parts.length < 2) {
            parts = (dateString + "/-1/-1").split("/")
        } else if (parts.length < 3) {
            parts = (dateString + "/-1").split("/")
        }

        const dateParts = dateFormat.split("/");
        const currentDate = new Date();
        let year,month,day:number = 0;

        dateParts.forEach((part, index) => {
            let value = parts[index]
            if (value == "-1") {
                if (part.toLowerCase().startsWith("y")) {
                    year = currentDate.getFullYear();
                } else if (part.toLowerCase().startsWith("d")) {
                    day = currentDate.getDate();
                } else {
                    month = currentDate.getMonth();
                }
            } else {
                if (part.toLowerCase().startsWith("y")) {
                    year = Number(value);
                } else if (part.toLowerCase().startsWith("d")) {
                    day = Number(value);
                } else {
                    month = Number(value);
                }
            }
        })
        
        return new Date(year, month - 1, day);
    }
    

    async parse(transactions: string[], dateFormat: string): Promise<CreateMonetaryTransactionDTO[]> {
            const result: CreateMonetaryTransactionDTO[] = [];
            for (let i = 0; i < transactions.length; i++) {
                const transaction = await this.parseTransaction(transactions[i], dateFormat);
                if (transaction) {
                    result.push(transaction);
                }                
            }            
            Logger.log(result);
            return result;
    }
    

    constructor(
        @InjectRepository(MonetaryTransaction)
        private transactionsRepository: Repository<MonetaryTransaction>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        private categoriasService: CategoryService
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
        return this.transactionsRepository.find({
            relations: {
                account: true,
                category: true,
            }
        });
    }

    findAllForAccount(accountId: number) {
        return this.transactionsRepository.find({      
            relations: {
                account: true,
                category: true,
            },
            where: {
                account: {
                    id: accountId,
                },
            }
        });
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
