import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Result } from 'src/modules/backoffice/models/result.model';
import { Contract } from '../modules/backoffice/contracts/contract';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(public contract: Contract) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const body = context.switchToHttp().getRequest().body;
    const valid = this.contract.validate(body);

    if (!valid) {
      throw new HttpException(
        new Result('Ops, algo saiu errado', false, null, this.contract.erros),
        HttpStatus.BAD_REQUEST,
      );
    }

    return next.handle();
  }
}
