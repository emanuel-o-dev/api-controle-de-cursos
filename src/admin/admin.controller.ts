import { UseGuards, Controller, Get } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get()
  @Roles('ADMIN')
  @ApiResponse({ status: 200, description: 'Acesso concedido ao admin.' })
  @ApiResponse({ status: 401, description: 'Acesso negado.' })
  @ApiBearerAuth()
  getAdminData() {
    return { message: 'Bem-vindo, Admin!' };
  }
}
