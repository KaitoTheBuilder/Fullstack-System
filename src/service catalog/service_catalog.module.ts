import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ServiceCatalogService } from './service_catalog.service';
import { ServiceCatalogController } from './service_catalog.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ServiceCatalogController],
  providers: [ServiceCatalogService],
  exports: [ServiceCatalogService],
})
export class ServiceCatalogModule {}
