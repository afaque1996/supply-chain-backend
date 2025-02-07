import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome(): string {
    return '🚀 Welcome to the Supply Chain API! Use /auth/register to create a user.';
  }
}
