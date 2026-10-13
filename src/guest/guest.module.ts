import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GuestsController } from './guest.controller';
import { GuestsService } from './guest.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [GuestsController],
  providers: [GuestsService],
  exports: [GuestsService],
})
export class GuestsModule {}