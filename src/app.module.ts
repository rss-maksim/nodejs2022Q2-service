import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { AuthModule } from './modules/auth/auth.module';
import ormConfig from './ormconfig';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { LoggingModule } from './modules/logging/logging.module';
import { AppLoggerMiddleware } from './modules/logging/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot({ ...ormConfig.options, autoLoadEntities: true }),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
