import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { LoggingInterceptor } from 'src/interceptors/logging/logging.interceptor';
import { LoggerMiddleware } from 'src/middlewares/logger/logger.middleware';

describe('CoursesController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [CoursesService, LoggingInterceptor, LoggerMiddleware], // <- precisa disso
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
