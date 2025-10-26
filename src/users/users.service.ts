import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(email);
    }
    return user;
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  async update(id: number, updateData: Partial<CreateUserDto>) {
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }
}
