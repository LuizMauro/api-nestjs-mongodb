import { Flunt } from '../../../../utils/flunt';
import { Contract } from '../contract';
import { CreditCard } from '../../models/credit-card.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCreditCardContract implements Contract {
  erros: any[];
  validate(model: CreditCard): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.holder, 5, 'Nome no cartão inválido');
    flunt.isFixedLen(model.number, 16, 'Numero do cartão inválido');
    flunt.isFixedLen(
      model.expiration,
      4,
      'Data de expiração do cartão inválido',
    );

    this.erros = flunt.errors;

    return flunt.isValid();
  }
}
