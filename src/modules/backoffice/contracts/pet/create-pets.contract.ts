import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';
import { Pet } from 'src/modules/backoffice/models/pet.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreatePetContract implements Contract {
  erros: any[];
  validate(model: Pet): boolean {
    const flunt = new Flunt();

    flunt.hasMinLen(model.name, 3, 'Nome invalido');
    flunt.hasMinLen(model.gender, 3, 'Genero invalido');
    flunt.hasMinLen(model.kind, 3, 'Tipo invalido');
    flunt.hasMinLen(model.brand, 3, 'Raça invalido');

    this.erros = flunt.errors;

    return flunt.isValid();
  }
}
