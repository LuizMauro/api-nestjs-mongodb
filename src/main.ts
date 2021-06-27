import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomLoggerService } from './shared/services/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
  });

  app.use(compression());

  //Open API
  const options = new DocumentBuilder()
    .setTitle('PetShop API')
    .setDescription('API do cuso 7180')
    .setVersion('0.0.1')
    .addTag('petshop')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3333);
}
bootstrap();
