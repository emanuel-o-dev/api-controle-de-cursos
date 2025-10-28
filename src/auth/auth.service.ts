import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
// (Opcionalmente, importe DTOs de Login e Registro se você os criar)

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Método de registro de novo usuário
  async register(
    email: string,
    password: string,
    name: string = '',
    age?: number,
  ) {
    // Verifica se o email já está cadastrado (unicidade)
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email já está em uso.');
    }

    // Gera hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds de salt (padrão)

    // Cria novo usuário no banco (usando o model User do Prisma)
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        age: age,
      },
    });
    // Retorna o usuário criado (sem a senha)
    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  // Método de login: valida credenciais e retorna JWT
  async login(email: string, password: string) {
    // Busca o usuário pelo email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Compara a senha informada com o hash salvo
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Credenciais ok, gerar JWT (payload pode incluir informações úteis do usuário)
    const payload = { sub: user.id, email: user.email }; // 'sub' é padrão JWT para subject (id do usuário)
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
