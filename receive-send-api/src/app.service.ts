import { Injectable, UnauthorizedException } from '@nestjs/common';
import UserClient from './clients/UserClient';
import RecordClient from './clients/RecordClient';
import { QueueService } from './queue/queue.service'; // Supondo que você tenha um serviço de fila


@Injectable()
export class AppService {
  private userClient = UserClient.getInstance();
  private recordClient = RecordClient.getInstance();
  constructor(private readonly queueService: QueueService) {}

  async sendMessage(token: string, userIdSend: number, userIdReceive: number, message: string): Promise<any> {
    const authResponse = await this.userClient.checkAuth(userIdSend.toString(), token);

    if (!authResponse.auth) {
      throw new UnauthorizedException('User is not authenticated');
    }

    const savedMessage = await this.recordClient.createMessage({ user_id_send: userIdSend, user_id_receive: userIdReceive, message });

    return savedMessage;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async processMessages(token: string, userIdSend: number, userIdReceive: number): Promise<any> {
    const authResponse = await this.userClient.checkAuth(userIdSend.toString(), token);

    if (!authResponse.auth) {
      throw new UnauthorizedException('User is not authenticated');
    }

    const queueName = `${userIdSend}${userIdReceive}`;
    const messages = await this.queueService.getMessagesFromQueue(queueName);

    const savedMessages = [];
    for (const message of messages) {
      const savedMessage = await this.recordClient.createMessage({ user_id_send: userIdSend, user_id_receive: userIdReceive, message });
      savedMessages.push(savedMessage);
    }

    return savedMessages;
  }

  async getMessage(token: string, userId: number): Promise<any> {
    const authResponse = await this.userClient.checkAuth(userId.toString(), token);

    if (!authResponse.auth) {
      throw new UnauthorizedException('User is not authenticated');
    }

    const messages = await this.recordClient.getMessageById(userId);

    return messages.map(message => ({
      userId: message.user_id_send,
      msg: message.message,
    }));
  }
}
