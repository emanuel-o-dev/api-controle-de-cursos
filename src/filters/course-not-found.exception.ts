import { HttpException, HttpStatus } from '@nestjs/common';

export class CourseNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Curso com ID ${id} não foi encontrado.`, HttpStatus.NOT_FOUND);
  }
}
