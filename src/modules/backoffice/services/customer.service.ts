import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDocument, Customer } from '../models/customer.model';
import { QueryDTO } from '../dtos/query.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<CustomerDocument>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);
    return await customer.save();
  }

  async findAll(): Promise<Customer[]> {
    // return await this.model.find({}, '-pets').exec();
    return await this.model
      .find({})
      .populate('user', 'username')
      .sort('name')
      .exec();
  }

  async find(document): Promise<Customer> {
    return await this.model
      .findOne({ document })
      .populate('user', 'username')
      .exec();
  }

  async query(model: QueryDTO): Promise<Customer[]> {
    return await this.model
      .find(model.query, model.fields, {
        skip: model.skip,
        limit: model.take,
      })
      .sort(model.sort)
      .exec();
  }
}
