import {
  IsString,
  IsNotEmpty,
  Min,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product Name cannot be empty.' })
  productName!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0.01, { message: 'Price must be at least 0.01.' })
  price!: number;

  @IsString()
  @IsNotEmpty({ message: 'Product Description cannot be empty.' })
  description!: string;
}
