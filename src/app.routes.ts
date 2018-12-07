import { Routes } from 'nest-router';

import { UserModule } from './modules/user/user.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthController } from './modules/core/auth/auth.controller';
import { JournalModule } from './modules/journal/journal.module';
import { TodolistItemModule } from './modules/todolist-item/todolist-item.module';
import { ItemTagModule } from './modules/item-tag/item-tag.module';
import { HealthInfoModule } from './modules/health-info/health-info.module';
import { HealthTypeModule } from './modules/health-type/health-type.module';
import { StocksModule } from './modules/stocks/stocks.module';
import { ActionModule } from './modules/action/action.module';
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
    path: '/todolist-items',
    module: TodolistItemModule,
  },
  {
    path: '/item-tags',
    module: ItemTagModule,
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
  {
    path: 'stocks',
    module: StocksModule,
  },
  {
    path: '/actions',
    module: ActionModule,
  },
  // needle-modules-routes
];
