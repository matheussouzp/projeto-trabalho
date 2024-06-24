import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add')
  addMessage(@Body() body: { queueName: string, message: string }) {
    this.queueService.addMessageToQueue(body.queueName, body.message);
  }
}
