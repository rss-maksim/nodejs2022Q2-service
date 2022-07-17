import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './services';
import { TracksRepository } from './tracks.repository';

@Module({
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksService, TracksRepository],
})
export class TracksModule {}
