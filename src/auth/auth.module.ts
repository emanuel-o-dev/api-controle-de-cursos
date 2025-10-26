import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configura Passport com estratégia padrão JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'minha_chave_secreta', // chave de assinatura do token
      signOptions: { expiresIn: '1h' }, // token expira em 1 hora (ajuste conforme necessário)
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, JwtAuthGuard],
  exports: [AuthService], // exporta AuthService se precisar usar em outros módulos
})
export class AuthModule {}
