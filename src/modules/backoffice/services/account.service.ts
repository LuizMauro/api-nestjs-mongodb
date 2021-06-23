import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../models/user.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly model: Model<UserDocument>,
  ) {}

  async create(data: User): Promise<User> {
    const user = new this.model(data);
    return await user.save();
  }

  async findOneByUsername(username) {
    return new User(username, '46493364817', true);
  }
}
