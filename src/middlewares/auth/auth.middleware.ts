import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.authorization) {
      res.status(401).json({ message: 'Token não fornecido' });
      return;
    }
    next();
  }
}
