import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BookingsService } from './booking.service';
import { BookingController } from './booking.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BookingController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}