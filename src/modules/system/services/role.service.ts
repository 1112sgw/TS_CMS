import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository , DeleteResult, UpdateResult } from 'typeorm';
import { Role } from '../entities';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async getRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }
  async getRoleById(id): Promise<Role | null> {
    return await this.roleRepository.findOne(id);
  }
  async createRole(entity): Promise<Role[] | null> {
    return await this.roleRepository.create(entity);
  }
  async updateRole(id, entity): Promise<UpdateResult> {
    entity.updateAt = new Date();
    return await this.roleRepository.update(id, entity);
  }
  async deleteRole(id): Promise<DeleteResult> {
    return await this.roleRepository.delete(id);
  }

  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
