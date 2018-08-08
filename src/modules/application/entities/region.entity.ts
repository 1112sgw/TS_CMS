import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Region {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  parentId: number;

  @Column({ nullable: false })
  agencyId: number;

  @Column({ length: 120, nullable: false})
  name: string;

  // type:"0: 国家 1:省 2：市 3: 区"
  @Column({ nullable: false })
  type: number;

}