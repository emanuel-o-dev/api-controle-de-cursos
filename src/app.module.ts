import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { ErrorsModule } from './errors/errors.module';

@Module({
  imports: [SharedModule, CoreModule, CoursesModule, UsersModule, ErrorsModule],
  controllers: [AppController],
  providers: [AppService],
})
// O que faz esse módulo?
// Este módulo é o módulo raiz da aplicação, onde todos os outros módulos são importados e configurados.
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/users'); // Aplica o middleware AuthMiddleware para todas as rotas que começam com /users
  }
}
// O que é um módulo?
// Um módulo é uma classe anotada com o decorator @Module, que organiza o código em unidades coesas, agrupando controladores, provedores e outros módulos relacionados.
