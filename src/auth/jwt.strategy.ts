import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

interface JwtPayload {
  sub: number;
  email: string;
  role?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extrai JWT do header Bearer
      ignoreExpiration: false, // rejeita tokens expirados automaticamente
      secretOrKey: process.env.JWT_SECRET || 'minha_chave_secreta', // mesma chave usada no JwtModule
    });
  }

  // Método chamado após validação do token. 'payload' é o conteúdo decodificado do JWT.
  async validate(payload: JwtPayload) {
    // Verifica se o usuário existe no banco de dados
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return { userId: user.id, email: user.email, role: user.role };
  }
}
