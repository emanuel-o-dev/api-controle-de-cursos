export class Course {
  id: number;
  code: string;
  name: string;
  description?: string;
  hoursTotal: number;
  level: 'Básico' | 'Intermediário' | 'Avançado';
  type: 'Presencial' | 'EAD' | 'Híbrido';
  prerequisites?: string[];
}
