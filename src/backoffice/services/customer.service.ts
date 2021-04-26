import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDocument, Customer } from '../models/customer.model';
import { AddressDocument, Address } from '../models/address.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<CustomerDocument>,
  ) {}

  async create(data: Customer): Promise<Customer> {
    const customer = new this.model(data);
    return await customer.save();
  }

  async addBillingAddress(document: string, data: Address): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          billingAddress: data,
        },
      },
      options,
    );
  }

  async addShippingAddress(document: string, data: Address): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          shippingAddress: data,
        },
      },
      options,
    );
  }
}
