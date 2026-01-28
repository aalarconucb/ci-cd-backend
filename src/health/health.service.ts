import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check() {
    try {
      // Ping real a la DB (Postgres)
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        db: 'ok',
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      console.error(err);
      // Si falla la DB, el health debe reflejarlo (útil para CI y deploy)
      throw new ServiceUnavailableException({
        status: 'error',
        db: 'down',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
