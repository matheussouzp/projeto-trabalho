import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token is missing');
    }

    // Assumir que o token está no formato "Bearer <token>"
    const token = authHeader.split(' ')[1]; // Isso remove "Bearer " do token

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret');
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
