import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

import { ProductController } from 'src/modules/store/controllers/product.controller';
import { OrderController } from 'src/modules/store/controllers/order.controller';

import { ProductService } from 'src/modules/store/services/product.service';
import { OrderItemService } from 'src/modules/store/services/order-item.service';
import { OrderService } from 'src/modules/store/services/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, OrderItem])],
  controllers: [ProductController, OrderController],
  providers: [ProductService, OrderItemService, OrderService],
})
export class StoreModule {}
