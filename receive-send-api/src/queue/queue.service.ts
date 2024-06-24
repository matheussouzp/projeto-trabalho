import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
  private queues: { [key: string]: string[] } = {};

  addMessageToQueue(queueName: string, message: string) {
    if (!this.queues[queueName]) {
      this.queues[queueName] = [];
    }
    this.queues[queueName].push(message);
  }

  getMessagesFromQueue(queueName: string): string[] {
    const messages = this.queues[queueName] || [];
    this.queues[queueName] = []; // Clear the queue after reading
    return messages;
  }
}
