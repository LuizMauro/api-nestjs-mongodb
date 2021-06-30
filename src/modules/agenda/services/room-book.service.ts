import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BookRoomCommand } from '../commands/book-room.command';

@Injectable()
export class RoomBookService {
  constructor(private readonly commnadBus: CommandBus) {}

  async Book(customerId: string, roomId: string) {
    return await this.commnadBus.execute(
      new BookRoomCommand(customerId, roomId),
    );
  }
}
