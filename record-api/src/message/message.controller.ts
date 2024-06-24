import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() messageData: Partial<Message>): Promise<Message> {
    return await this.messageService.create(messageData);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return await this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    return await this.messageService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Message>): Promise<Message> {
    return await this.messageService.update(+id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.messageService.remove(+id);
  }
}
