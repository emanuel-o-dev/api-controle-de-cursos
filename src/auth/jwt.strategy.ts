import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extrai JWT do header Bearer
      ignoreExpiration: false, // rejeita tokens expirados automaticamente
      secretOrKey: process.env.JWT_SECRET || 'minha_chave_secreta', // mesma chave usada no JwtModule
    });
  }

  // Método chamado após validação do token. 'payload' é o conteúdo decodificado do JWT.
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
