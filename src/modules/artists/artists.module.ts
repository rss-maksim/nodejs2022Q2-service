import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './services';
import { ArtistsRepository } from './artists.repository';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository],
  exports: [ArtistsService, ArtistsRepository],
})
export class ArtistsModule {}
