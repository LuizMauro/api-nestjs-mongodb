import { Body, HttpException, HttpStatus } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  UseInterceptors,
} from '@nestjs/common';

import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contracts';
import { QueryContract } from '../contracts/query.contract';

import { CreateCustomerDTO } from '../dtos/customer/create-customer-dto';
import { QueryDTO } from '../dtos/query.dto';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';

import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';
import { UpdateCustomerContract } from '../contracts/customer/update-customer-contracts';
import { UpdateCustomerDTO } from '../dtos/customer/update-customer-dto';
import { Md5 } from 'md5-typescript';

@Controller('v1/customers')
export class CustomerController {
  constructor(
    private readonly accountService: AccountService,
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
  async post(@Body() model: CreateCustomerDTO) {
    try {
      const password = await Md5.init(`${model.password}123456789987654321`);

      const user = await this.accountService.create(
        new User(model.document, password, true, ['user']),
      );

      const customer = new Customer(
        model.name,
        model.document,
        model.email,
        [],
        null,
        null,
        null,
        user,
      );

      const resp = await this.customerService.create(customer);

      return new Result('Cliente Criado com sucesso', true, resp, null);
    } catch (error) {
      throw new HttpException(
        new Result(
          'Não foi possivel realizar seu cadastro',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
  async update(@Param('document') document, @Body() model: UpdateCustomerDTO) {
    try {
      await this.customerService.update(document, model);
      return new Result(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new Result('Não foi possivel atualizar', false, null, null),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAll() {
    const customers = await this.customerService.findAll();
    return new Result(null, true, customers, null);
  }

  @Get(':document')
  async get(@Param('document') document) {
    const customer = await this.customerService.find(document);
    return new Result(null, true, customer, null);
  }

  @Post('query')
  @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
  async query(@Body() model: QueryDTO) {
    const customers = await this.customerService.query(model);

    return new Result(null, true, customers, null);
  }
}
