import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { RedisIoAdapter } from './adapters/redis-io.adapter';

const httpsOptions = {
  key: fs.readFileSync('C:\\dev\\ssl\\ca.key'),
  cert: fs.readFileSync('C:\\dev\\ssl\\ca.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
