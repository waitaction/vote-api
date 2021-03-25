import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { XHttpExceptionFilter } from './core/http-exception.filter';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //全局异常处理
  app.useGlobalFilters(new XHttpExceptionFilter());
  //允许跨域
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('简易投票系统')
    .setDescription('简易投票系统接口')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}


bootstrap();