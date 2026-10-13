import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Booking_ServicesController } from './booking_service.controller';
import { Booking_ServicesService } from './booking_service.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [Booking_ServicesController],
  providers: [Booking_ServicesService],
  exports: [Booking_ServicesService],
})
export class Booking_ServicesModule {}