import {
  UseFilters,
  UseInterceptors,
  Controller,
  Get,
  Param,
  HttpException,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';
import { ResponseInterceptor } from 'src/interceptors/response/response.interceptor';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (id !== '1') {
      throw new HttpException('Usuário não encontrado', 404);
    }
    return { id, name: 'John Doe' };
  }

  @Get()
  findAll() {
    return [{ id: 1, name: 'John Doe' }];
  }
}
