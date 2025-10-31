import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { ErrorsModule } from './errors/errors.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    SharedModule,
    CoreModule,
    CoursesModule,
    UsersModule,
    ErrorsModule,
    PrismaModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
// O que faz esse módulo?
// Este módulo é o módulo raiz da aplicação, onde todos os outros módulos são importados e configurados.
export class AppModule {
  configure(consumer: MiddlewareConsumer) {}
}
