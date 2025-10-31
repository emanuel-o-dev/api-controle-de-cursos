import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseNotFoundException } from '../filters/course-not-found.exception';
import { CourseCodeInUseException } from '../filters/course-code-in-use.exception';
import { Course } from '@prisma/client';
import { CustomException } from '../filters/custom-exception.exception';

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

    try {
      return await this.prisma.course.create({
        data: {
          ...data,
          createdBy: { connect: { id: createdById } },
        },
      });
    } catch (error) {
      throw new CustomException(error.message);
    }
  }

  // Buscar todos os cursos (com criador e alunos inscritos)
  async findAll(): Promise<Course[]> {
    return await this.prisma.course.findMany({
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
        Enrollment: {
          select: { userId: true },
        },
      },
    });
  }

  // Buscar curso específico
  async findOne(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
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
  async update(id: number, updateData: Partial<Course>): Promise<Course> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new CourseNotFoundException(id);
    }

    return await this.prisma.course.update({
      where: { id },
      data: updateData,
    });
  }

  // Remover curso
  async remove(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new CourseNotFoundException(id);
    }

    return this.prisma.course.delete({ where: { id } });
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
    if (existing) throw new CustomException('Aluno já inscrito neste curso.');

    return await this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
      include: {
        course: { select: { id: true, code: true, description: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  // Cancelar inscrição de aluno
  async unenrollStudent(courseId: number, userId: number) {
    try {
      await this.prisma.enrollment.deleteMany({
        where: { userId, courseId },
      });
      return { message: 'Inscrição cancelada com sucesso.' };
    } catch (error) {
      throw new CustomException('Erro ao cancelar inscrição: ' + error.message);
    }
  }
}
