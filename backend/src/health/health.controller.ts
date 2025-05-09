import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HealthController {
  @Get()
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
