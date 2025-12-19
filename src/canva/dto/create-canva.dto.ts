import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

class SizeDto {
  @IsNumber()
  @Min(32)
  @Max(1000)
  width: number;

  @IsNumber()
  @Min(32)
  @Max(1000)
  height: number;
}

export class CreateCanvaDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => SizeDto)
  @IsNotEmpty()
  size: SizeDto;
}
