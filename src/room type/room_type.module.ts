import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RoomTypesService } from './room_type.service';
import { RoomTypesController } from './room_type.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [RoomTypesController],
  providers: [RoomTypesService],
  exports: [RoomTypesService],
})
export class RoomTypesModule {}
