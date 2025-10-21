import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseNotFoundException } from '../filters/course-not-found.exception';
import { PrismaService } from '../prisma/prisma.service';
import { CourseCodeInUseException } from '../filters/course-code-in-use.exception';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCourseDto) {
    const course = await this.prisma.course.findUnique({
      where: { code: data.code },
    });
    if (course) {
      throw new CourseCodeInUseException(data.code);
    }
    return await this.prisma.course.create({ data });
  }

  async findAll(): Promise<Course[]> {
    return await this.prisma.course.findMany();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new CourseNotFoundException(id);
    }
    return course;
  }

  async update(id: number, updateData: Partial<Course>): Promise<Course> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new CourseNotFoundException(id);
    }
    return this.prisma.course.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<void> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new CourseNotFoundException(id);
    }
    await this.prisma.course.delete({ where: { id } });
  }
}
