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
import { CategoryDTO } from 'src/domain/category.dto';
import { CategoryService } from 'src/domain/category.service';
import { CreateCategoryDTO } from 'src/domain/create-category.dto';

@Controller('category')
@ApiTags('rgfinance')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Post()
    create(@Body() category: CreateCategoryDTO) {
        return this.categoryService.create(category);
    }

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() categoryDTO: CategoryDTO,
    ) {
        return this.categoryService.update(id, categoryDTO);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.remove(id);
    }
}
