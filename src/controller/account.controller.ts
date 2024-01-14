import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountDTO } from 'src/domain/account.dto';
import { AccountService } from 'src/domain/account.service';
import { CreateAccountDTO } from 'src/domain/create-account.dto';

@Controller('account')
@ApiTags('rgfinance')
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Post()
    create(@Body() account: CreateAccountDTO) {
        return this.accountService.create(account);
    }

    @Get()
    findAll() {
        return this.accountService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.accountService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() accountDTO: AccountDTO,
    ) {
        return this.accountService.update(id, accountDTO);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.accountService.remove(id);
    }
}
