export interface Contract {
  erros: any[];
  validate(model: any): boolean;
}
