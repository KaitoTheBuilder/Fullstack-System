import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { Booking_ServicesService } from './booking_service.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('booking_service')
export class Booking_ServicesController {
  constructor(private readonly bookingsService: Booking_ServicesService) {}

  // Get all booking services (protected)
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