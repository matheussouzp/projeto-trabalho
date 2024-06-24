import { Controller, Post, Get, Body, Query, Headers, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('message')
export class AppController {
  constructor(private readonly messageService: AppService) {}

  @Post()
  async sendMessage(
    @Headers('authorization') authHeader: string,
    @Body('userIdSend') userIdSend: number,
    @Body('userIdReceive') userIdReceive: number,
    @Body('message') message: string
  ): Promise<any> {
    if (!authHeader) {
      throw new UnauthorizedException('Token is missing');
    }

    const token = authHeader.split(' ')[1]; // Assume 'Bearer <token>'
    return await this.messageService.sendMessage(token, userIdSend, userIdReceive, message);
  }

  @Post('worker')
  async processMessages(
    @Headers('authorization') authHeader: string,
    @Body('userIdSend') userIdSend: number,
    @Body('userIdReceive') userIdReceive: number
  ): Promise<any> {
    if (!authHeader) {
      throw new UnauthorizedException('Token is missing');
    }

    const token = authHeader.split(' ')[1]; // Assume 'Bearer <token>'
    return await this.messageService.processMessages(token, userIdSend, userIdReceive);
  }

  // @Get()
  // async getMessage(
  //   @Headers('authorization') authHeader: string,
  //   @Query('user') userId: string,
  //   @Body('userIdSend') userIdSend: number,
  // ): Promise<any> {
  //   if (!authHeader) {
  //     throw new UnauthorizedException('Token is missing');
  //   }

  //   const token = authHeader.split(' ')[1]; // Assume 'Bearer <token>'
  //   return await this.messageService.sendMessage(token, userIdSend, userIdReceive, message);
  // }
}
