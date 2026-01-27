import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Min,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  @Length(3, 3)
  currency: string;

  @IsInt()
  @Min(0)
  cost: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsIn(["active", "inactive"])
  status?: "active" | "inactive";
}
