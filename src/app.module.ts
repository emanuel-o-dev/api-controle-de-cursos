import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [SharedModule, CoreModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
// O que faz esse módulo?
// Este módulo é o módulo raiz da aplicação, onde todos os outros módulos são importados e configurados.
export class AppModule {}
// O que é um módulo?
// Um módulo é uma classe anotada com o decorator @Module, que organiza o código em unidades coesas, agrupando controladores, provedores e outros módulos relacionados.
