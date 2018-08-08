import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository , DeleteResult, UpdateResult } from 'typeorm';
import { Region } from '../entities/region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  async getRegions(): Promise<Region[]> {
    return await this.regionRepository.find();
  }
}
