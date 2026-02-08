import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
      res.status(401).json({ message: 'Missing authorization header' });
      return;
    }

    const header = Array.isArray(authHeader) ? authHeader[0] : authHeader as string;
    const match = header.match(/^Bearer\s+(.+)$/i);
    if (!match) {
      res.status(401).json({ message: 'Invalid authorization format' });
      return;
    }

    const token = match[1];
    try {
      const payload: any = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'your-secret-key' } as any);
      // attach user info to request for downstream handlers
      (req as any).user = { userId: payload.sub, email: payload.email };
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
