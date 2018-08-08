import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  createdAt: Date;

  @Column('timestamp')
  updatedAt: Date;

  @Column('timestamp')
  deletedAt: Date;

  @Column({ length: 100 })
  createdBy: string;

  @Column({ length: 100 })
  updatedBy: string;

  @Column({ length: 100 })
  deletedBy: string;

  @Column()
  isDeleted: boolean;

}