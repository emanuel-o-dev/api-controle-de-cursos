import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsIn,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    example: 'CURSO1',
    description: 'Código único do curso (não pode ser repetido)',
  })
  @IsString({ message: 'Código deve ser uma string' })
  @IsNotEmpty({ message: 'Código não pode ser vazio' })
  code: string;

  @ApiProperty({
    example: 'Introdução à Programação',
    description: 'Nome completo do curso',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @ApiProperty({
    example: 'Curso introdutório sobre fundamentos de programação.',
    description: 'Breve descrição do curso',
  })
  @IsString({ message: 'Descrição deve ser uma string' })
  description: string;

  @ApiProperty({
    example: 40,
    description: 'Carga horária total em horas',
  })
  @IsNumber({}, { message: 'hoursTotal deve ser um número' })
  hoursTotal: number;

  @ApiProperty({
    example: 'Básico',
    enum: ['Básico', 'Intermediário', 'Avançado'],
    description: 'Nível de dificuldade do curso',
  })
  @IsIn(['Básico', 'Intermediário', 'Avançado'], {
    message:
      'Level deve ser um dos seguintes valores: Básico, Intermediário, Avançado',
  })
  level: 'Básico' | 'Intermediário' | 'Avançado';

  @ApiProperty({
    example: 'Presencial',
    enum: ['Presencial', 'EAD', 'Híbrido'],
    description: 'Tipo de oferta do curso (modalidade)',
  })
  @IsIn(['Presencial', 'EAD', 'Híbrido'], {
    message: 'Type deve ser um dos seguintes valores: Presencial, EAD, Híbrido',
  })
  type: 'Presencial' | 'EAD' | 'Híbrido';

  @ApiProperty({
    example: ['Lógica de Programação', 'Matemática Básica'],
    required: false,
    description: 'Pré-requisitos para cursar (opcional)',
  })
  @IsArray({ message: 'Prerequisites deve ser um array' })
  @IsOptional()
  prerequisites?: string[];

  @ApiProperty({
    example: 1,
    required: false,
    description:
      'ID do usuário criador do curso (setado automaticamente no backend)',
  })
  @IsInt({ message: 'createdBy deve ser um número inteiro' })
  @IsOptional()
  createdBy?: number;
}
