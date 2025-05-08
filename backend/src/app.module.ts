import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.HOST,
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
  controllers: [],
  providers: [],
})
export class AppModule {}
