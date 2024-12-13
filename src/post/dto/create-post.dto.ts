import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  specs?: string[];

  @IsOptional()
  @IsString()
  photos?: string[];

  @IsOptional()
  @IsString()
  awards?: string[];
}
