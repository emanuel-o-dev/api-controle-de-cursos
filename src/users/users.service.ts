import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

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

  async update(id: number, updateData: Partial<CreateUserDto>) {
    return this.prisma.user.update({
      where: { id },
      data: updateData,
      omit: { password: true },
    });
  }
  async remove(id: number) {
    await this.prisma.user.delete({ where: { id }, omit: { password: true } });
  }
}
