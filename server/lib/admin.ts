import { createAccessControl } from 'better-auth/plugins/access';
import type { SubArray } from 'better-auth/plugins/access';
import {
  adminAc,
  defaultStatements,
  userAc,
} from 'better-auth/plugins/admin/access';
import { resourceConfigs } from '../resource/index.js';

// Build resource statements dynamically from configs
const resourceStatements: Record<string, readonly string[]> = {};
const resourcePermissions: Record<string, string[]> = {};

for (const config of resourceConfigs) {
  resourceStatements[config.name] = config.permissions;
  resourcePermissions[config.name] = [...config.permissions];
}

export const statement = {
  ...resourceStatements,
  ...defaultStatements,
} as const;

export type Role = keyof typeof allRoles;

export type Permissions = {
  [k in keyof typeof statement]?: SubArray<(typeof statement)[k]>;
};

export const ac = createAccessControl(statement);

const adminRole = ac.newRole({
  ...resourcePermissions,
  ...adminAc.statements,
});

const userRole = ac.newRole({
  ...resourcePermissions,
  ...userAc.statements,
});

export const allRoles = {
  admin: adminRole,
  user: userRole,
} as const;

export const rolesData = Object.keys(allRoles) as Array<Role>;

export type rolesEnumData = (typeof rolesData)[number];
