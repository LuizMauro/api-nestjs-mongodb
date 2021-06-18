import { Body, HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Post, Param, UseInterceptors } from '@nestjs/common';

import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateCreditCardContract } from '../contracts/credit-card/create-credit-card.contracts';

import { CreditCard } from '../models/credit-card.model';
import { Result } from '../models/result.model';

import { CreditCardService } from '../services/credit-card.service';

@Controller('v1/credit-card')
export class CreditCardController {
  constructor(private readonly service: CreditCardService) {}

  @Post(':document')
  @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
  async post(@Param('document') document, @Body() model: CreditCard) {
    try {
      await this.service.saveOrUpdated(document, model);

      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possivel realizar ', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
