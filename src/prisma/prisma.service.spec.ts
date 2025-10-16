import { Test, TestingModule } from '@nestjs/testing';
jest.mock('@prisma/client', () => {
  class PrismaClient {
    async $connect() {}
    async $disconnect() {}
  }
  return { PrismaClient };
});
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
