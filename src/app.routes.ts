import { Routes } from 'nest-router';

import { UserModule } from './modules/user/user.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthController } from './modules/core/auth/auth.controller';
import { JournalModule } from './modules/journal/journal.module';
import { HealthInfoModule } from './modules/health-info/health-info.module';
import { HealthTypeModule } from './modules/health-type/health-type.module';
// needle-module-import

export const appRoutes: Routes = [
  {
    path: '/users',
    module: UserModule,
  },
  {
    path: '/roles',
    module: RolesModule,
  },
  {
    path: '/auth',
    module: AuthController,
  },
  {
    path: '/journals',
    module: JournalModule,
  },
  {
    path: '/health-infos',
    module: HealthInfoModule,
  },
  {
    path: '/health-types',
    module: HealthTypeModule,
  },
  // needle-modules-routes
];
