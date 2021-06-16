import { Body, HttpException, HttpStatus } from '@nestjs/common';
import { Controller, Get, Post, Param, UseInterceptors } from '@nestjs/common';

import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateCustomerContract } from '../contracts/customer/create-customer.contracts';

import { CreateCustomerDTO } from '../dtos/create-customer-dto';
import { QueryDTO } from '../dtos/query.dto';
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';

import { AccountService } from '../services/account.service';
import { CustomerService } from '../services/customer.service';

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
      const user = await this.accountService.create(
        new User(model.document, model.password, true),
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
  async query(@Body() model: QueryDTO) {
    const customers = await this.customerService.query(model);

    return new Result(null, true, customers, null);
  }
}
