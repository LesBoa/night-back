import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './modules/core/logger/logger.module';
import { RouterModule } from 'nest-router';
import { appRoutes } from './app.routes';
import { ConfigModule } from './modules/core/config/config.module';
import { RolesGuard } from './guards/roles.guard';
import { UserModule } from './modules/user/user.module';
import { ConfigService } from './modules/core/config/config.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { TodolistItemModule } from './modules/todolist-item/todolist-item.module';
import { ItemTagModule } from './modules/item-tag/item-tag.module';
import { JournalModule } from './modules/journal/journal.module';

import { HealthInfoModule } from './modules/health-info/health-info.module';
import { HealthTypeModule } from './modules/health-type/health-type.module';

import { StocksModule } from './modules/stocks/stocks.module';
import { ActionModule } from './modules/action/action.module';
// needle-module-import

@Module({
  imports: [
    ConfigModule, // Global
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        url: configService.databaseUrl,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: configService.isLoggingDb ? 'all' : false,
      }),
      inject: [ConfigService],
    }),
    LoggerModule, // Global
    RouterModule.forRoutes(appRoutes),
    AuthModule,
    UserModule,
    RolesModule,
    JournalModule,
    TodolistItemModule,
    ItemTagModule,

    HealthInfoModule,
    HealthTypeModule,

    TodolistItemModule,
    ItemTagModule,

    StocksModule,
    ActionModule,
    // needle-module-includes
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}
