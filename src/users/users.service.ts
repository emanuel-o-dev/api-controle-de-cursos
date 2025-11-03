import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: { Enrollment: true },
      omit: { password: true },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      omit: { password: true },
    });
    if (!user)
      throw new NotFoundException(`Usuário com e-mail ${email} não encontrado`);
    return user;
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    if (!user)
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    return user;
  }

  async update(id: number, updateData: Partial<UpdateUserDto>) {
    if (updateData.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: updateData.email },
        select: { id: true },
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('E-mail já está em uso');
      }
    }

    try {
      // await para que rejeições do Prisma sejam pegas pelo catch abaixo
      return await this.prisma.user.update({
        where: { id },
        data: updateData,
        omit: { password: true },
      });
    } catch (error: any) {
      // Log do erro original para ajudar no diagnóstico
      console.error('Prisma update error for user', {
        id,
        error: String(error),
      });

      // Trata erros conhecidos do Prisma de forma específica
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002: Unique constraint failed
        if (error.code === 'P2002') {
          throw new ConflictException('E-mail já está em uso');
        }
        // P2025: Record to update not found
        if (error.code === 'P2025') {
          throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
      }
      throw new InternalServerErrorException('Erro ao atualizar usuário');
    }
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id }, omit: { password: true } });
  }
}
