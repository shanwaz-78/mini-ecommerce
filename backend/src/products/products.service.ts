import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<{ message: string; createdProduct: Product }> {
    try {
      const product = this.productRepo.create({
        ...createProductDto,
        image: file?.filename,
      });

      const createdProduct = await this.productRepo.save(product);

      return {
        message: `Product Added Successfully.`,
        createdProduct,
      };
    } catch (error) {
      console.error(`[Error]: while processing product.`, error.message);
      throw new InternalServerErrorException(
        `Failed to process product details.`,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productRepo.find();
      return products
        .filter((eachProduct) => eachProduct.image !== null)
        .map((eachProduct) => ({
          ...eachProduct,
          image: `http://localhost:8181/uploads/${eachProduct.image}`,
        }));
    } catch (error) {
      console.error(`[Error]: Failed to get All images.`, error.message);
      throw new InternalServerErrorException(
        `Failed to process all products request.`,
      );
    }
  }
}
