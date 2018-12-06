import { IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class VPagination {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  page: number = 0;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;
}
