import { Module } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from './modules/store/store.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from 'src/modules/store/entities/product.entity';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:120897@7180.gnbtq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'api-nest',
      entities: [Product],
      synchronize: true,
    }),
    BackofficeModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
