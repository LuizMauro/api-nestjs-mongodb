import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  Post,
  Body,
  Put,
  Param,
} from '@nestjs/common';

import { Order } from 'src/modules/store/entities/order.entity';
import { OrderItem } from 'src/modules/store/entities/order-item.entity';
import { Result } from 'src/modules/backoffice/models/result.model';

import { ProductService } from 'src/modules/store/services/product.service';
import { OrderService } from 'src/modules/store/services/order.service';
import { OrderItemService } from 'src/modules/store/services/order-item.service';

import { OrderItemDto } from 'src/modules/store/dtos/order-item.dto';

@Controller('v1/orders')
export class OrderController {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly orderItemService: OrderItemService,
  ) {}

  @Get(':order')
  async get(@Param('order') order: string) {
    try {
      const orders = await this.orderService.getByNumber(order);
      return new Result(null, true, orders, null);
    } catch (error) {
      throw new HttpException(
        new Result('Error', false, null, null),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('customer/:customer')
  async getByCustomer(@Param('customer') customer: string) {
    try {
      console.log(customer);
      const orders = await this.orderService.getByCustomer(customer);
      return new Result(null, true, orders, null);
    } catch (error) {
      throw new HttpException(
        new Result('Error', false, null, null),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async post(@Body() model: OrderItemDto[]) {
    try {
      let order = new Order();
      order.customer = '46493364817'; //vem do token (JWT)
      order.date = new Date();
      order.number = '1B2D3F5';
      order.items = [];
      await this.orderService.post(order);

      for (const item of model) {
        //REHIDRATAR
        let product = await this.productService.getById(item.product);
        let orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.product = product;
        orderItem.price = product.price;
        orderItem.quantity = item.quantity;

        await this.orderItemService.post(orderItem);
      }

      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Error', false, null, null),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
