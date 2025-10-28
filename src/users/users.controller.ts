import {
  UseFilters,
  UseInterceptors,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';
import { ResponseInterceptor } from 'src/interceptors/response/response.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
