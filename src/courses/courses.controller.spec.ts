import { Test, TestingModule } from '@nestjs/testing';
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
jest.mock('./courses.controller', () => {
  return { CoursesController: class {} };
});
const { CoursesController } = require('./courses.controller');
describe('CoursesController', () => {
  let controller: typeof CoursesController;

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

    controller = module.get<typeof CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
