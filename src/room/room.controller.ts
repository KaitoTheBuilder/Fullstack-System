import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { RoomInput, RoomsService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller(['room', 'rooms'])
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // Get all rooms (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.roomsService.getAll();
  }

  // Get single room by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.roomsService.findById(+id);
  }

  // Create room (open - for demo)
  @Post()
  async create(@Body() body: Required<RoomInput>) {
    return this.roomsService.createRoom(body);
  }

  // Update room (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: RoomInput) {
    return this.roomsService.updateRoom(+id, body);
  }

  // Delete room (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roomsService.deleteRoom(+id);
  }
}
