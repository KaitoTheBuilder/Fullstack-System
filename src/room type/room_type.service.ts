import { Injectable } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from '../database/database.service';

interface RoomTypeRow extends RowDataPacket {
  type_id: number;
  type_name: string;
  base_price: string;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface RoomTypeInput {
  type_name?: string;
  base_price?: number;
}

@Injectable()
export class RoomTypesService {
  constructor(private readonly db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async getAll() {
    const [rows] = await this.pool()!.execute<RoomTypeRow[]>(
      'SELECT type_id, type_name, base_price, created_at, updated_at FROM room_type',
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool()!.execute<RoomTypeRow[]>(
      'SELECT type_id, type_name, base_price, created_at, updated_at FROM room_type WHERE type_id = ?',
      [id],
    );
    return rows[0];
  }

  async createRoomType(roomType: Required<RoomTypeInput>) {
    const [result] = await this.pool()!.execute<ResultSetHeader>(
      'INSERT INTO room_type (type_name, base_price) VALUES (?, ?)',
      [roomType.type_name, roomType.base_price],
    );
    return { type_id: result.insertId, ...roomType };
  }

  async updateRoomType(id: number, partial: RoomTypeInput) {
    const fields: string[] = [];
    const values: (string | number)[] = [];

    if (partial.type_name !== undefined) {
      fields.push('type_name = ?');
      values.push(partial.type_name);
    }
    if (partial.base_price !== undefined) {
      fields.push('base_price = ?');
      values.push(partial.base_price);
    }
    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    await this.pool()!.execute(
      `UPDATE room_type SET ${fields.join(', ')} WHERE type_id = ?`,
      values,
    );
    return this.findById(id);
  }

  async deleteRoomType(id: number) {
    const [result] = await this.pool()!.execute<ResultSetHeader>(
      'DELETE FROM room_type WHERE type_id = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}
