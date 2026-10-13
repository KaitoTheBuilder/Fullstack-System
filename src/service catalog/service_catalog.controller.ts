import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServiceCatalogInput, ServiceCatalogService } from './service_catalog.service';

@Controller('service_catalog')
export class ServiceCatalogController {
  constructor(private readonly serviceCatalogService: ServiceCatalogService) {}

  // Get all service catalog items (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.serviceCatalogService.getAll();
  }

  // Get single service catalog item by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.serviceCatalogService.findById(+id);
  }

  // Create service catalog item (open - for demo)
  @Post()
  async create(@Body() body: Required<ServiceCatalogInput>) {
    return this.serviceCatalogService.create(body);
  }

  // Update service catalog item (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: ServiceCatalogInput) {
    return this.serviceCatalogService.update(+id, body);
  }

  // Delete service catalog item (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serviceCatalogService.remove(+id);
  }
}
