import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class RedisClientOptionsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  host: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsOptional()
  @IsNumber()
  retryAttempts: number = 5;

  @IsOptional()
  @IsNumber()
  retryDelay: number = 1000;

  @IsOptional()
  @IsBoolean()
  wildcards: boolean = false;
}
