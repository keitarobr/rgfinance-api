import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
    controllers: [AccountController],
    imports: [DomainModule],
    providers: [],
})
export class ControllerModule { }
