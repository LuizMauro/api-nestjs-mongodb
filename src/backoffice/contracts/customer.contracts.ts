import { Flunt } from '../../utils/flunt';
import { Contract } from './contract';
import { Customer } from '../models/customer.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomerContract implements Contract {
  erros: any[];
  validate(model: Customer): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');
    flunt.isEmail(model.email, 'Email inválido');
    flunt.isFixedLen(model.document, 11, 'CPF inválido');
    flunt.hasMinLen(model.password, 6, 'Senha inválido');
    flunt.hasMinLen(model.pets, 1, 'Pelo menos 1 pet');

    this.erros = flunt.errors;

    return flunt.isValid();
  }
}
