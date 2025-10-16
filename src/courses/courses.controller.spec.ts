import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { LoggingInterceptor } from '../interceptors/logging/logging.interceptor';
import { LoggerMiddleware } from '../middlewares/logger/logger.middleware';
import { PrismaService } from '../prisma/prisma.service';
jest.mock('@prisma/client', () => {
  class PrismaClient {
    async $connect() {}
    async $disconnect() {}
  }
  return { PrismaClient };
});
describe('CoursesController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        CoursesService,
        LoggingInterceptor,
        LoggerMiddleware,
        PrismaService,
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
