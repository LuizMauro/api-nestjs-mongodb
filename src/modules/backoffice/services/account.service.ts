import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Md5 } from 'md5-typescript';
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
    var customer = await await this.customerModel
      .findOne({ document: username })
      .populate('user')
      .exec();

    const pass = await Md5.init(`${password}123456789987654321`);

    if (pass.toString() == customer.user.password.toString()) {
      return customer;
    } else {
      return null;
    }
  }
}
