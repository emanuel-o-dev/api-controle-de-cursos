import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseNotFoundException } from '../filters/course-not-found.exception';
import { CourseCodeInUseException } from '../filters/course-code-in-use.exception';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  // Criar curso (associando o criador)
  async create(data: CreateCourseDto, createdById: number) {
    const existing = await this.prisma.course.findUnique({
      where: { code: data.code },
    });
    if (existing) {
      throw new CourseCodeInUseException(data.code);
    }

    return await this.prisma.course.create({
      data: {
        ...data,
        createdBy: { connect: { id: createdById } },
      },
      include: { createdBy: true },
    });
  }

  // Buscar todos os cursos (com criador e alunos inscritos)
  async findAll(): Promise<any[]> {
    return await this.prisma.course.findMany({
      include: {
        createdBy: true,
        Enrollment: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  // Buscar curso específico
  async findOne(id: number): Promise<any> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        createdBy: true,
        Enrollment: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!course) {
      throw new CourseNotFoundException(id);
    }

    return course;
  }

  // Atualizar curso
  async update(id: number, updateData: Partial<any>): Promise<any> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new CourseNotFoundException(id);
    }

    return await this.prisma.course.update({
      where: { id },
      data: updateData,
      include: { createdBy: true },
    });
  }

  // Remover curso
  async remove(id: number): Promise<void> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new CourseNotFoundException(id);
    }

    await this.prisma.course.delete({ where: { id } });
  }

  // Inscrever usuário em curso
  async enrollStudent(courseId: number, userId: number) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!course) throw new CourseNotFoundException(courseId);

    // Evita duplicidade
    const existing = await this.prisma.enrollment.findFirst({
      where: { userId, courseId },
    });
    if (existing) return existing;

    return await this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
      include: {
        user: true,
        course: true,
      },
    });
  }

  // Cancelar inscrição de aluno
  async unenrollStudent(courseId: number, userId: number) {
    return await this.prisma.enrollment.deleteMany({
      where: { userId, courseId },
    });
  }
}
