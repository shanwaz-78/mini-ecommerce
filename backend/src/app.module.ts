import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        ssl: {
          rejectUnauthorized: false,
        },
        url: process.env.DATABASE_URL,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PSWD,
        database: process.env.DATABASE,
        port: parseInt(process.env.DB_PORT, 10),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    ProductsModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
