import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Base } from './base';

@Entity()
export class User extends Base {

  @Column({ length: 50, nullable: true })
  wechatOpenId: string;

  @Column({ length: 50, nullable: false })
  userName: string;

  @Column({ length: 50, nullable: true })
  nickName: string;

  @Column({ length: 250, nullable: false })
  password: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column('int')
  gender: number;

  @Column({nullable: true})
  avatar: string;

  @Column({nullable: true})
  birthday: number;

  @Column({length: 20, nullable: true})
  mobile: string;

}