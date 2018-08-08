import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Session {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  sid: string;

  @Column()
  sess: string;

  @Column()
  expire: Date;

}