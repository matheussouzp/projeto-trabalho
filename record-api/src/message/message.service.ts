import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(messageData: Partial<Message>): Promise<Message> {
    const message = this.messageRepository.create(messageData);
    return await this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    return await this.messageRepository.findOne({where: {message_id : id}});
  }

  async update(id: number, updateData: Partial<Message>): Promise<Message> {
    await this.messageRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }

  async findAllByUserIdReceive(userIdReceive: number): Promise<Message[]> {
    return await this.messageRepository.find({ where: { user_id_receive: userIdReceive } });
  }
}
