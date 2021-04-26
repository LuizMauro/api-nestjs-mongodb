import { Flunt } from '../../../utils/flunt';
import { Contract } from '../contract';
import { CreateCustomerDTO } from '../../dtos/create-customer-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomerContract implements Contract {
  erros: any[];
  validate(model: CreateCustomerDTO): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');
    flunt.isEmail(model.email, 'Email inválido');
    flunt.isFixedLen(model.document, 11, 'CPF inválido');
    flunt.hasMinLen(model.password, 6, 'Minimo de 6 caracteres');

    this.erros = flunt.errors;

    return flunt.isValid();
  }
}
