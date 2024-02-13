import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { MonetaryTransaction } from './monetary-transaction.entity';
import { MonetaryTransactionService } from './monetary-transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([Account, Category, MonetaryTransaction])],
    exports: [AccountService, CategoryService, MonetaryTransactionService],
    providers: [AccountService, CategoryService, MonetaryTransactionService],
})
export class DomainModule { }
