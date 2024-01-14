import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { DomainModule } from 'src/domain/domain.module';
import { CategoryController } from './category.controller';

@Module({
    controllers: [AccountController, CategoryController],
    imports: [DomainModule],
    providers: [],
})
export class ControllerModule { }
