import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { coursesSeed } from './courses.seed';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  private courses: Course[] = coursesSeed;

  private idCounter = this.courses.length + 1;

  create(course: CreateCourseDto): Course {
    const newCourse = { id: this.idCounter++, ...course };
    this.courses.push(newCourse);
    return newCourse;
  }

  findAll(): Course[] {
    return this.courses;
  }

  findOne(id: number): Course {
    const course = this.courses.find((c) => c.id === id);
    if (!course) throw new NotFoundException(`Curso ${id} não encontrado`);
    return course;
  }

  update(id: number, updateData: Partial<Course>): Course {
    const course = this.findOne(id);
    Object.assign(course, updateData);
    return course;
  }

  remove(id: number): void {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Curso ${id} não encontrado`);
    this.courses.splice(index, 1);
  }
}
