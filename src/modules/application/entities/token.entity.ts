import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120, nullable: false})
  Token: string;

  @Column('timestamp')
  AccessTime: Date;

  @Column('timestamp')
  ExpireTime: Date;

  @Column({ length: 120, nullable: false})
  Type: string;

}