import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Base } from './base';

@Entity()
export class User extends Base {

  @Column({ length: 50 })
  wechatOpenId: string;

  @Column({ length: 50, nullable: false })
  userName: string;

  @Column({ length: 50 })
  nickName: string;

  @Column({ length: 50 })
  password: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column('int')
  gender: number;

  @Column()
  avatar: string;

  @Column('int')
  birthday: number;

  @Column({length: 20})
  mobile: string;

}