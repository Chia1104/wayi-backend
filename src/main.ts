import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IS_PRODUCTION } from '@wanin/shared/constants';
import * as helmet from 'helmet';
import {
  X_FRAME_OPTIONS,
  X_PERMITTED_CROSS_DOMAIN_POLICIES,
  REFERRER_POLICY,
  CROSS_ORIGIN_OPENER_POLICY,
  CROSS_ORIGIN_RESOURCE_POLICY,
  CROSS_ORIGIN_EMBEDDER_POLICY,
} from '@wanin/shared/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (!IS_PRODUCTION) {
    const config = new DocumentBuilder()
      .setTitle('Wayi Backend API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/documentation', app, document);
  }

  app.enableCors();

  app.use(
    helmet.crossOriginEmbedderPolicy({
      policy: CROSS_ORIGIN_EMBEDDER_POLICY,
    }),
  );
  app.use(
    helmet.crossOriginOpenerPolicy({
      policy: CROSS_ORIGIN_OPENER_POLICY,
    }),
  );
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: CROSS_ORIGIN_RESOURCE_POLICY,
    }),
  );
  app.use(helmet.expectCt());
  app.use(
    helmet.frameguard({
      action: X_FRAME_OPTIONS,
    }),
  );
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.originAgentCluster());
  app.use(
    helmet.permittedCrossDomainPolicies({
      permittedPolicies: X_PERMITTED_CROSS_DOMAIN_POLICIES,
    }),
  );
  app.use(
    helmet.referrerPolicy({
      policy: REFERRER_POLICY,
    }),
  );

  await app.listen(process.env.PORT || 3001);
}
bootstrap().then(() =>
  console.log(`Server is running on port ${process.env.PORT || 3001}`),
);
