import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GuestsService } from './guest.service';

@Controller(['guest', 'guests'])
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  // Get all guests (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.guestsService.getAll();
  }

  // Get single guest by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.guestsService.findById(+id);
  }

  // Create guest (open - for demo)
  @Post()
  async create(@Body() body: { first_name: string; last_name: string; email: string; phone: string }) {
    return this.guestsService.createGuest(body);
  }

  // Update guest (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { first_name?: string; last_name?: string; email?: string; phone?: string },
  ) {
    return this.guestsService.updateGuest(+id, body);
  }

  // Delete guest (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.guestsService.deleteGuest(+id);
  }
}