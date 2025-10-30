import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'usuario@example.com',
    description: 'Endereço de e-mail único do usuário',
  })
  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  email: string;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @ApiProperty({
    example: 'SenhaSegura123',
    description: 'Senha do usuário',
  })
  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  password: string;

  @ApiProperty({
    example: 25,
    required: false,
    description: 'Idade do usuário (opcional)',
  })
  @IsNumber({}, { message: 'Idade deve ser um número' })
  @IsOptional()
  age?: number;
}
