// src/courses/dto/create-course.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsIn,
  IsInt,
} from 'class-validator';

export class CreateCourseDto {
  @IsString({ message: 'Código deve ser uma string' })
  @IsNotEmpty({ message: 'Código não pode ser vazio' })
  code: string;

  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: 'hoursTotal deve ser um número' })
  hoursTotal: number;

  @IsIn(['Básico', 'Intermediário', 'Avançado'], {
    message:
      'Level deve ser um dos seguintes valores: Básico, Intermediário, Avançado',
  })
  level: 'Básico' | 'Intermediário' | 'Avançado';

  @IsIn(['Presencial', 'EAD', 'Híbrido'], {
    message: 'Type deve ser um dos seguintes valores: Presencial, EAD, Híbrido',
  })
  type: 'Presencial' | 'EAD' | 'Híbrido';

  @IsArray({ message: 'Prerequisites deve ser um array' })
  @IsOptional()
  prerequisites?: string[];

  @IsInt({ message: 'createdBy deve ser um número inteiro' })
  @IsOptional()
  createdBy?: number;
}
