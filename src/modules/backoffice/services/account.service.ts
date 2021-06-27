import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../models/customer.model';
import { UserDocument, User } from '../models/user.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('User') private readonly model: Model<UserDocument>,
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async create(data: User): Promise<User> {
    const user = new this.model(data);
    return await user.save();
  }

  async update(username: string, data: any): Promise<User> {
    return await this.model.findOneAndUpdate({ username }, data);
  }

  async authenticate(username, password): Promise<Customer> {
    return await this.customerModel
      .findOne({
        'user.username': username,
        'user.password': password,
      })
      .populate('user', '-password')
      .exec();
  }
}
