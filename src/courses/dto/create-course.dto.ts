// src/courses/dto/create-course.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  hoursTotal: number;

  @IsIn(['Básico', 'Intermediário', 'Avançado'])
  level: 'Básico' | 'Intermediário' | 'Avançado';

  @IsIn(['Presencial', 'EAD', 'Híbrido'])
  type: 'Presencial' | 'EAD' | 'Híbrido';

  @IsArray()
  @IsOptional()
  prerequisites?: string[];
}
