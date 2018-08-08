import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleService, RolePermissionMappingService } from '../services';
import { Reflector } from '@nestjs/core';
import _ from 'lodash';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get<string[]>('permission', context.getHandler());
    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasPermission  = _.indexOf(user.permissions, permission) > -1;
    return user && user.permissions && hasPermission;
  }
}