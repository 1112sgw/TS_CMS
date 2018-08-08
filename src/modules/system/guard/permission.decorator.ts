import { ReflectMetadata } from '@nestjs/common';

export const Roles = (...permission: string[]) => ReflectMetadata('permission', permission);