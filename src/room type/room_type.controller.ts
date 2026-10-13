import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { RoomTypeInput, RoomTypesService } from './room_type.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('room_types')
export class RoomTypesController {
  constructor(private readonly roomTypesService: RoomTypesService) {}

  // Get all room types (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.roomTypesService.getAll();
  }

  // Get single room type by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.roomTypesService.findById(+id);
  }

  // Create room type (open - for demo)
  @Post()
  async create(@Body() body: Required<RoomTypeInput>) {
    return this.roomTypesService.createRoomType(body);
  }

  // Update room type (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: RoomTypeInput) {
    return this.roomTypesService.updateRoomType(+id, body);
  }

  // Delete room type (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.roomTypesService.deleteRoomType(+id);
  }
}
