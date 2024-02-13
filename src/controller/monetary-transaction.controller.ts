import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMonetaryTransactionDTO } from 'src/domain/create-monetary-transaction.dto';
import { MonetaryTransactionDTO } from 'src/domain/monetary-transaction.dto';
import { MonetaryTransactionService } from 'src/domain/monetary-transaction.service';

@Controller('transaction')
@ApiTags('rgfinance')
export class MonetaryTransactionController {
    constructor(private transactionService: MonetaryTransactionService) { }

    @Post()
    create(@Body() account: CreateMonetaryTransactionDTO) {
        return this.transactionService.create(account).catch((error) => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error saving: ' + error,
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        })
    }

    @Get()
    findAll() {
        return this.transactionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.transactionService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() transactionDTO: MonetaryTransactionDTO,
    ) {
        return this.transactionService.update(id, transactionDTO).catch((error) => {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Error saving: ' + error,
            }, HttpStatus.BAD_REQUEST, {
                cause: error
            });
        })
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.transactionService.remove(id);
    }
}
