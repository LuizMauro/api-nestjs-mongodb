import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreditCard } from '../models/credit-card.model';
import { CustomerDocument, Customer } from '../models/customer.model';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<CustomerDocument>,
  ) {}

  async saveOrUpdated(document: string, data: CreditCard): Promise<Customer> {
    const options = { upsert: true };
    return await this.model.findOneAndUpdate(
      { document },
      {
        $set: {
          creditCard: data,
        },
      },
      options,
    );
  }
}
