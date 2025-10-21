import { HttpException, HttpStatus } from '@nestjs/common';

export class CourseCodeInUseException extends HttpException {
  constructor(private readonly data: any) {
    super(`O codigo ${data} já está em uso.`, HttpStatus.BAD_REQUEST);
  }
}
