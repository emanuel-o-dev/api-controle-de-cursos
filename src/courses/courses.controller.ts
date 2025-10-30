import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { LoggingInterceptor } from '../interceptors/logging/logging.interceptor';
import { CustomException } from '../filters/custom-exception.exception';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
@UseInterceptors(LoggingInterceptor)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto, @Request() req) {
    if (!createCourseDto.code || !createCourseDto.description) {
      throw new CustomException('Campos obrigatórios ausentes.');
    }
    return await this.coursesService.create(createCourseDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return await this.coursesService.update(id, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.coursesService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.INSTRUCTOR, Role.ADMIN)
  @Post(':id/enroll')
  async enroll(@Param('id', ParseIntPipe) courseId: number, @Request() req) {
    const studentId = req.user.userId; // obtém o id do aluno logado pelo token JWT
    return await this.coursesService.enrollStudent(courseId, studentId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.INSTRUCTOR, Role.ADMIN)
  @Delete(':id/unenroll')
  async unenroll(@Param('id', ParseIntPipe) courseId: number, @Request() req) {
    const studentId = req.user.userId;
    return await this.coursesService.unenrollStudent(courseId, studentId);
  }
}
