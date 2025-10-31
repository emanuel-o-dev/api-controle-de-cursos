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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { LoggingInterceptor } from '../interceptors/logging/logging.interceptor';
import { CustomException } from '../filters/custom-exception.exception';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Courses')
@ApiBearerAuth()
@UseInterceptors(LoggingInterceptor)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os cursos' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso.' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um curso pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do curso', type: Number })
  @ApiResponse({ status: 200, description: 'Curso encontrado.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @ApiOperation({ summary: 'Cria um novo curso' })
  @ApiResponse({ status: 201, description: 'Curso criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Campos obrigatórios ausentes.' })
  @ApiBody({ type: CreateCourseDto })
  @ApiBearerAuth()
  async create(@Body() createCourseDto: CreateCourseDto, @Request() req) {
    if (!createCourseDto.code || !createCourseDto.description) {
      throw new CustomException('Campos obrigatórios ausentes.');
    }
    return await this.coursesService.create(createCourseDto, req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @ApiOperation({ summary: 'Atualiza um curso existente' })
  @ApiParam({ name: 'id', description: 'ID do curso', type: Number })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: 'Curso atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return await this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INSTRUCTOR)
  @ApiOperation({ summary: 'Remove um curso' })
  @ApiParam({ name: 'id', description: 'ID do curso', type: Number })
  @ApiResponse({ status: 200, description: 'Curso removido com sucesso.' })
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.coursesService.remove(id);
  }

  @Post(':id/enroll')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.INSTRUCTOR, Role.ADMIN)
  @ApiOperation({ summary: 'Matricula o usuário autenticado em um curso' })
  @ApiParam({ name: 'id', description: 'ID do curso', type: Number })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Usuário matriculado com sucesso.' })
  async enroll(@Param('id', ParseIntPipe) courseId: number, @Request() req) {
    const studentId = req.user.userId;
    return await this.coursesService.enrollStudent(courseId, studentId);
  }

  @Delete(':id/unenroll')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER, Role.INSTRUCTOR, Role.ADMIN)
  @ApiOperation({ summary: 'Remove a matrícula do usuário autenticado' })
  @ApiParam({ name: 'id', description: 'ID do curso', type: Number })
  @ApiResponse({ status: 200, description: 'Matrícula removida com sucesso.' })
  @ApiBearerAuth()
  async unenroll(@Param('id', ParseIntPipe) courseId: number, @Request() req) {
    const studentId = req.user.userId;
    return await this.coursesService.unenrollStudent(courseId, studentId);
  }
}
