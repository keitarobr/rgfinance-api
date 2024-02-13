import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { DomainModule } from 'src/domain/domain.module';
import { CategoryController } from './category.controller';
import { MonetaryTransactionController } from './monetary-transaction.controller';

@Module({
    controllers: [AccountController, CategoryController, MonetaryTransactionController],
    imports: [DomainModule],
    providers: [],
})
export class ControllerModule { }
