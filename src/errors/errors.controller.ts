import { Controller, Get, Param, NotFoundException } from '@nestjs/common';

@Controller('errors')
export class ErrorsController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (id !== '1') {
      throw new NotFoundException('Recurso não encontrado');
    }
    return { id, message: 'Recurso encontrado' };
  }
}
