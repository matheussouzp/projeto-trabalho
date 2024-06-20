import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Column({ unique: true })
  message_id: number;

  @Column()
  message: string;

  @Column()
  user_id_send: number;

  @Column()
  user_id_receive: number;

}
