import {
  Controller,
  Get,
  Param,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomException } from '../filters/custom-exception.exception';

@Controller('errors')
export class ErrorsController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (id !== '1') {
      throw new NotFoundException('Recurso não encontrado');
    }
    return { id, message: 'Recurso encontrado' };
  }

  @Get('/http-exception-simple')
  throwHttpExceptionSimple() {
    throw new HttpException('Acesso proibido', HttpStatus.FORBIDDEN);
  }

  @Get('/custom-error')
  throwCustomError() {
    throw new CustomException('Este é um erro personalizado.');
  }
}
