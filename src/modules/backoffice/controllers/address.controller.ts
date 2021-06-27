import { Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Post, Param, UseInterceptors } from '@nestjs/common';

import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';

import { CreateAddressContract } from '../contracts/address/create-address.contract';

import { Result } from '../models/result.model';
import { Address } from '../models/address.model';

import { AddressService } from '../services/address.service';

import { AddressType } from '../enums/address-type.enum';

@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: Address) {
    try {
      await this.service.create(document, model, AddressType.Billing);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possivel adicionar seu endereço',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document,
    @Body() model: Address,
  ) {
    try {
      await this.service.create(document, model, AddressType.Shipping);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possivel adicionar seu endereço',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('search/:zipcode')
  async search(@Param('zipcode') zipcode) {
    try {
      const response = await this.service
        .getAddressByZipCode(zipcode)
        .toPromise();
      return new Result(null, true, response.data, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possivel localigar seu endereço',
          null,
          false,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
