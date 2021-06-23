import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/accounts')
export class AccountController {
  constructor() {}

  @Get('')
  @UseGuards(AuthGuard())
  findAll() {
    return [];
  }
}
