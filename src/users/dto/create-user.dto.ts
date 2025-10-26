import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  email: string;

  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  password: string;

  @IsNumber({}, { message: 'Idade deve ser um número' })
  age?: number;
}
