import { Routes } from 'nest-router';

import { UserModule } from './modules/user/user.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthController } from './modules/core/auth/auth.controller';
import { JournalModule } from './modules/journal/journal.module';
import { TodolistItemModule } from './modules/todolist-item/todolist-item.module';
import { ItemTagModule } from './modules/item-tag/item-tag.module';
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
  // needle-modules-routes
];
