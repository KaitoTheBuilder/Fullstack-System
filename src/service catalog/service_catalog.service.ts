import { Injectable } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from '../database/database.service';

interface ServiceCatalogRow extends RowDataPacket {
  service_id: number;
  service_name: string;
  price: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface ServiceCatalogInput {
  service_name?: string;
  price?: number;
}

@Injectable()
export class ServiceCatalogService {
  constructor(private readonly db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async getAll() {
    const [rows] = await this.pool()!.execute<ServiceCatalogRow[]>(
      'SELECT service_id, service_name, price, created_at, updated_at FROM service_catalog',
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool()!.execute<ServiceCatalogRow[]>(
      'SELECT service_id, service_name, price, created_at, updated_at FROM service_catalog WHERE service_id = ?',
      [id],
    );
    return rows[0];
  }

  async create(service: Required<ServiceCatalogInput>) {
    const [result] = await this.pool()!.execute<ResultSetHeader>(
      'INSERT INTO service_catalog (service_name, price) VALUES (?, ?)',
      [service.service_name, service.price],
    );
    return { service_id: result.insertId, ...service };
  }

  async update(id: number, partial: ServiceCatalogInput) {
    const fields: string[] = [];
    const values: (string | number)[] = [];

    if (partial.service_name !== undefined) {
      fields.push('service_name = ?');
      values.push(partial.service_name);
    }
    if (partial.price !== undefined) {
      fields.push('price = ?');
      values.push(partial.price);
    }
    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    await this.pool()!.execute(`UPDATE service_catalog SET ${fields.join(', ')} WHERE service_id = ?`, values);
    return this.findById(id);
  }

  async remove(id: number) {
    const [result] = await this.pool()!.execute<ResultSetHeader>(
      'DELETE FROM service_catalog WHERE service_id = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}
