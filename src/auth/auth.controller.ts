import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(
      dto.email,
      dto.password,
      dto.name,
      dto.age,
    );
    return newUser;
  }

  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'usuario@example.com',
        },
        password: { type: 'string', minLength: 8, example: 'SenhaSegura123' },
      },
      required: ['email', 'password'],
    },
    examples: {
      valido_1: {
        summary: 'Login válido (1)',
        value: { email: 'usuario@example.com', password: 'SenhaSegura123' },
      },
      valido_2: {
        summary: 'Login válido (2)',
        value: { email: 'usuario@example.com', password: 'SenhaSegura123' },
      },
      valido_3: {
        summary: 'Login válido Admin',
        value: { email: 'testeStudio@example.com', password: '123456' },
      },
      invalido_email_invalido: {
        summary: 'Email em formato inválido',
        value: { email: 'usuario', password: 'minhasenha' },
        description: '❌ Falha: email não é um endereço válido.',
      },
      invalido_senha_curta: {
        summary: 'Senha com menos de 8 caracteres',
        value: { email: 'teste@example.com', password: '123' },
        description: '❌ Falha: password tem menos de 8 caracteres.',
      },
      invalido_email_vazio: {
        summary: 'Email vazio',
        value: { email: '', password: 'abcdefgh' },
        description: '❌ Falha: email vazio não é válido.',
      },
      invalido_senha_vazia: {
        summary: 'Senha vazia',
        value: { email: 'user@site.com', password: '' },
        description: '❌ Falha: password vazio não atende ao MinLength(8).',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const jwt = await this.authService.login(email, password);
    return jwt;
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  @ApiBearerAuth()
  async getPerfil(@Req() request) {
    const usuarioLogado = request.user;
    return {
      message: 'Você acessou uma rota protegida!',
      user: usuarioLogado,
    };
  }
}
