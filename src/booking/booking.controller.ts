import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BookingsService } from '../booking/booking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingController {
  constructor(private bookingsService: BookingsService) {}

  // Get all bookings (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.bookingsService.getAll();
  }

  // Get single booking by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.bookingsService.findById(+id);
  }

  // Create booking (open - for demo)
  @Post()
  async create(@Body() body: { username: string; password: string }) {
    return this.bookingsService.createBooking(body.username, body.password);
  }

  // Update booking (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.bookingsService.updateBooking(+id, body);
  }

  // Delete booking (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookingsService.deleteBooking(+id);
  }
}