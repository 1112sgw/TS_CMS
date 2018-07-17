import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base';

@Entity()
export class Session {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sid: string;

  @Column()
  sess: string;

  @Column()
  expire: Date;

}