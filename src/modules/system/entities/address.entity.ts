import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base';

@Entity()
export class Address extends Base {

  @Column({ length: 50, nullable: false})
  userId: string;

  @Column({ length: 120, nullable: false })
  address: string;

  @Column({ nullable: false })
  countryId: number;

  @Column({ length: 120, nullable: false })
  countryName: string;

  @Column({ nullable: false })
  provinceId: number;

  @Column({ length: 120, nullable: false })
  provinceName: string;

  @Column({ nullable: false })
  cityId: number;

  @Column({ length: 120, nullable: false })
  cityName: string;

  @Column({ nullable: false })
  districtId: number;

  @Column({ length: 120, nullable: false })
  districtName: string;

  @Column({ nullable: false, default: false })
  isDefault: boolean;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 20, nullable: false })
  mobile: string;

}