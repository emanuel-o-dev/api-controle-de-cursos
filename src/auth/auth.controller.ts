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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
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
  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const jwt = await this.authService.login(loginDto.email, loginDto.password);
    return jwt;
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
