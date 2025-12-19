import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  Min,
} from 'class-validator';

export class CreatePixelLogDto {
  @IsNumber()
  @Min(0)
  pxIndex: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsPositive()
  canvaId: number;

  @IsNumber()
  @IsPositive()
  userId: number;
}
