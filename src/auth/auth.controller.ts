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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // define o status 201 Created explicitamente
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
  @HttpCode(HttpStatus.OK) // define o status 200 OK explicitamente
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const jwt = await this.authService.login(email, password);
    return jwt; // retornará { access_token: '...' }
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async getPerfil(@Req() request) {
    const usuarioLogado = request.user;
    return {
      message: 'Você acessou uma rota protegida!',
      user: usuarioLogado,
    };
  }
}
