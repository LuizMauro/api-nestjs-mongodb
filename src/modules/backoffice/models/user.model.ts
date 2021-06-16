import { Document } from 'mongoose';

export type UserDocument = User & Document;
export class User {
  constructor(
    public username: string,
    public password: string,
    public active: boolean,
  ) {}
}
