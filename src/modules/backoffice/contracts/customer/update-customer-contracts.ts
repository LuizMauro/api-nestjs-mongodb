import { Flunt } from '../../../../utils/flunt';
import { Contract } from '../contract';
import { UpdateCustomerDTO } from '../../dtos/customer/update-customer-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateCustomerContract implements Contract {
  erros: any[];
  validate(model: UpdateCustomerDTO): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');

    this.erros = flunt.errors;

    return flunt.isValid();
  }
}
