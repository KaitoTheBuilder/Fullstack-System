import { Injectable } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from '../database/database.service';

interface GuestRow extends RowDataPacket {
  guest_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: Date | null;
  updated_at: Date | null;
}

interface GuestInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

@Injectable()
export class GuestsService {
  constructor(private readonly db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createGuest(guest: Required<GuestInput>) {
    const [result] = await this.pool()!.execute<ResultSetHeader>(
      'INSERT INTO guest (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)',
      [guest.first_name, guest.last_name, guest.email, guest.phone],
    );
    return { guest_id: result.insertId, ...guest };
  }

  async getAll() {
    const [rows] = await this.pool()!.execute<GuestRow[]>(
      'SELECT guest_id, first_name, last_name, email, phone, created_at, updated_at FROM guest',
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool()!.execute<GuestRow[]>(
      'SELECT guest_id, first_name, last_name, email, phone, created_at, updated_at FROM guest WHERE guest_id = ?',
      [id],
    );
    return rows[0];
  }

  async updateGuest(id: number, partial: GuestInput) {
    const fields: string[] = [];
    const values: (string | number)[] = [];

    for (const field of ['first_name', 'last_name', 'email', 'phone'] as const) {
      if (partial[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(partial[field]!);
      }
    }
    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    await this.pool()!.execute(
      `UPDATE guest SET ${fields.join(', ')} WHERE guest_id = ?`,
      values,
    );
    return this.findById(id);
  }

  async deleteGuest(id: number) {
    const [result] = await this.pool()!.execute<ResultSetHeader>(
      'DELETE FROM guest WHERE guest_id = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}