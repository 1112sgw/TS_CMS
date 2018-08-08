import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository , DeleteResult, UpdateResult } from 'typeorm';
import { Address } from '../entities';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async getAddresss(): Promise<Address[]> {
    return await this.addressRepository.find();
  }
  async getAddressById(id): Promise<Address | null> {
    return await this.addressRepository.findOne(id);
  }
  async createAddress(entity): Promise<Address[] | null> {
    return await this.addressRepository.create(entity);
  }
  async updateAddress(id, entity): Promise<UpdateResult> {
    entity.updateAt = new Date();
    return await this.addressRepository.update(id, entity);
  }
  async deleteAddress(id): Promise<DeleteResult> {
    return await this.addressRepository.delete(id);
  }

}
