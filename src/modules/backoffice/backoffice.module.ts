import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { AddressController } from './controllers/address.controller';
import { PetController } from './controllers/pet.controller';
import { CreditCardController } from './controllers/credit-card.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pet.service';
import { CreditCardService } from './services/credit-card.service';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { AuthService } from 'src/shared/services/auth.service';
import { AccountController } from './controllers/account.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'hash-123456',
      signOptions: {
        expiresIn: 3600,
      },
    }),
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
    AccountController,
  ],
  providers: [
    AddressService,
    AccountService,
    CustomerService,
    PetService,
    CreditCardService,
    AuthService,
    JwtStrategy,
  ],
})
export class BackofficeModule {}
