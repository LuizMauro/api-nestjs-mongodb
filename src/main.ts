import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { CustomLoggerService } from './shared/services/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
  });

  app.use(compression());
  await app.listen(3333);
}
bootstrap();
