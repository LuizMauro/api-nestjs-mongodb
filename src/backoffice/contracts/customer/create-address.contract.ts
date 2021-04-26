import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';
import { Address } from 'src/backoffice/models/address.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAddressContract implements Contract {
  erros: any[];
  validate(model: Address): boolean {
    const flunt = new Flunt();

    flunt.isFixedLen(model.zipCode, 8, 'CEP inválido');
    flunt.hasMinLen(model.street, 3, 'Rua invalida');
    flunt.hasMinLen(model.neighborhood, 3, 'Bairro invalido');
    flunt.hasMinLen(model.city, 3, 'Bairro invalido');
    flunt.isFixedLen(model.state, 2, 'Estado invalido');
    flunt.isFixedLen(model.country, 3, 'Pais invalido');

    this.erros = flunt.errors;

    return flunt.isValid();
  }
}
