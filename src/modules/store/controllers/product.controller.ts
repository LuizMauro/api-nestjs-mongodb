import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ProductService } from 'src/modules/store/services/product.service';
import { Product } from 'src/modules/store/entities/product.entity';
import { Result } from 'src/modules/backoffice/models/result.model';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async get() {
    try {
      const products = await this.service.get();
      return new Result(null, true, products, null);
    } catch (error) {
      throw new HttpException(
        new Result('Error', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async post(@Body() model: Product) {
    try {
      await this.service.post(model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Error', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async put(@Param('id') id, @Body() model: Product) {
    try {
      await this.service.put(id, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Error', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    try {
      await this.service.delete(id);
      return new Result(null, true, null, null);
    } catch (error) {
      throw new HttpException(
        new Result('Error', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
