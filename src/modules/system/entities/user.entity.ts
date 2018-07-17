import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base';

@Entity()
export class User extends Base {

  @Column({ length: 100, nullable: false })
  userName: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column('int')
  sex: number;

}