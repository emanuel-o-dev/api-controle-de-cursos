import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from 'src/interceptors/response/response.interceptor';

@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  @Get()
  findAll() {
    return [{ id: 1, name: 'John Doe' }];
  }
}
