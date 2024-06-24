import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message/message.module'; // Ajuste o caminho conforme necessário
import { Message } from './message/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // ou outro banco de dados que você está usando
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'matheus123',
      database: 'si7',
      entities: [Message],
      synchronize: true,
    }),
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
