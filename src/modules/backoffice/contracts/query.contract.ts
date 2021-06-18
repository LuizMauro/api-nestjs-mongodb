import { Injectable } from '@nestjs/common';
import { Contract } from 'src/modules/backoffice/contracts/contract';
import { QueryDTO } from 'src/modules/backoffice/dtos/query.dto';
import { Flunt } from 'src/utils/flunt';

@Injectable()
export class QueryContract implements Contract {
  erros: any[];

  validate(model: QueryDTO): boolean {
    const flunt = new Flunt();

    if (!model.query) {
      model.query = {};
    }

    flunt.isGreaterThan(
      model.take,
      1000,
      'Sua query não pode retornar mais de 1000 itens',
    );

    this.erros = flunt.errors;
    return flunt.isValid();
  }
}
