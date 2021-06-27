import { Body, HttpException, HttpStatus, Req } from '@nestjs/common';
import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { Guid } from 'guid-typescript';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { AuthService } from 'src/shared/services/auth.service';
import { AuthenticateDto } from '../dtos/account/authenticate.dto';
import { ChangePasswordDto } from '../dtos/account/change-password.dto';
import { ResetPasswordDto } from '../dtos/account/reset-password.dto';
import { Result } from '../models/result.model';
import { AccountService } from '../services/account.service';

@Controller('v1/accounts')
export class AccountController {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) {}

  @Post('authenticate')
  async authenticate(@Body() model: AuthenticateDto): Promise<any> {
    const customer = await this.accountService.authenticate(
      model.username,
      model.password,
    );

    if (!customer) {
      throw new HttpException(
        new Result('Usuario ou senha invalidos', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!customer.user.active) {
      throw new HttpException(
        new Result('Usuario inativo', false, null, null),
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.authService.createToken(
      customer.document,
      customer.email,
      '',
      customer.user.roles,
    );
    return new Result(null, true, { customer, token }, null);
  }

  @Post('reset-password')
  async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
    try {
      const password = Guid.create()
        .toString()
        .substring(0, 8)
        .replace('-', '');
      await this.accountService.update(model.document, { password: password });
      return new Result(
        'Uma nova senha foi enviada para seu email',
        true,
        null,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possivel restaurar sua senhha', false, null, false),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Req() request,
    @Body() model: ChangePasswordDto,
  ): Promise<any> {
    try {
      await this.accountService.update(request.user.document, {
        password: model.newPassword,
      });
      return new Result('Sua senha foi alterada com sucesso', true, null, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possivel alterar sua Senha', false, null, null),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('refresh')
  async refreshToken(@Req() request): Promise<any> {
    const token = await this.authService.createToken(
      request.user.document,
      request.user.email,
      request.user.image,
      request.user.roles,
    );

    return new Result(null, true, token, null);
  }
}
