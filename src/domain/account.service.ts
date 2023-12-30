import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { AccountDTO } from './account.dto';
import { Account } from './account.entity';
import { CreateAccountDTO } from './create-account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountsRepository: Repository<Account>,
    ) { }

    create(account: CreateAccountDTO) {
        return this.accountsRepository.exist({
            where: {
                name: account.name
            }
        }).then(exists => {
            if (!exists) {
                return this.accountsRepository.save(account);
            } else {
                throw new ConflictException("account with same name already exists");
            }
        });
    }

    findAll() {
        return this.accountsRepository.find();
    }

    findOne(id: number) {
        return this.accountsRepository.findOneBy({ id });
    }

    update(id: number, account: AccountDTO) {
        return this.accountsRepository.exist({
            where: {
                name: account.name,
                id: Not(id)
            }
        }).then(exists => {
            if (!exists) {
                return this.accountsRepository.update(id, account);
            } else {
                throw new ConflictException("account with same name already exists");
            }
        });
    }

    remove(id: number) {
        return this.accountsRepository.delete(id);
    }
}
