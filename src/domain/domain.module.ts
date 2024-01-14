import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
    imports: [TypeOrmModule.forFeature([Account, Category])],
    exports: [AccountService, CategoryService],
    providers: [AccountService, CategoryService],
})
export class DomainModule { }
