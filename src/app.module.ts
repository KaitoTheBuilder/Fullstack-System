import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GuestsModule } from './guest/guest.module';
import { BookingsModule } from './booking/booking.module';
import { Booking_ServicesModule } from './booking service/booking_service.module';
import { PaymentsModule } from './payment/payment.module';
import { RoomsModule } from './room/room.module';
import { RoomTypesModule } from './room type/room_type.module';
import { ServiceCatalogModule } from './service catalog/service_catalog.module';



@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, BookingsModule,Booking_ServicesModule, GuestsModule, PaymentsModule, RoomsModule, RoomTypesModule, ServiceCatalogModule],
})
export class AppModule {}