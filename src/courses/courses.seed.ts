// src/courses/courses.seed.ts

import { Course } from './entities/course.entity';

export const coursesSeed: Course[] = [
  {
    id: 1,
    code: 'CURS001',
    name: 'Introdução à Programação',
    description: 'Curso básico de lógica e programação.',
    hoursTotal: 40,
    level: 'Básico',
    type: 'Presencial',
    prerequisites: [],
  },
  {
    id: 2,
    code: 'CURS002',
    name: 'Desenvolvimento Web com HTML e CSS',
    description: 'Fundamentos para criar páginas web modernas.',
    hoursTotal: 60,
    level: 'Intermediário',
    type: 'EAD',
    prerequisites: ['Introdução à Programação'],
  },
  {
    id: 3,
    code: 'CURS003',
    name: 'APIs com NestJS',
    description: 'Construção de APIs REST com NestJS e TypeScript.',
    hoursTotal: 80,
    level: 'Avançado',
    type: 'Híbrido',
    prerequisites: ['Introdução à Programação'],
  },
];
