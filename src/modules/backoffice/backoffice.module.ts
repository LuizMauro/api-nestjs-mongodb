import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { AddressController } from './controllers/address.controller';
import { PetController } from './controllers/pet.controller';
import { CreditCardController } from './controllers/credit-card.controller';

import { MongooseModule } from '@nestjs/mongoose';

import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pet.service';
import { CreditCardService } from './services/credit-card.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [
    CustomerController,
    AddressController,
    PetController,
    CreditCardController,
  ],
  providers: [
    AddressService,
    AccountService,
    CustomerService,
    PetService,
    CreditCardService,
  ],
})
export class BackofficeModule {}
