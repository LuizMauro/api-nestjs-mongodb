import { LoggerService } from '@nestjs/common';

export class CustomLoggerService implements LoggerService {
  log(message: string) {
    console.log(message);
  }
  error(message: string, trace: string) {
    console.log('Ocorreu um erro -> ', message, trace);
  }
  warn(message: string) {
    console.log(message);
  }
  debug(message: string) {
    console.log(message);
  }
  verbose(message: string) {
    console.log(message);
  }
}
