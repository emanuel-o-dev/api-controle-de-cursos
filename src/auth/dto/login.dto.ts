import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'usuario@example.com' })
  email: string;

  @ApiProperty({ example: 'SenhaSegura123' })
  password: string;
}
