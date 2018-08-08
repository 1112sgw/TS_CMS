import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base';

@Entity()
export class UserRoleMapping {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  userId: string;

  @Column({ length: 100, nullable: false })
  roleId: string;

}