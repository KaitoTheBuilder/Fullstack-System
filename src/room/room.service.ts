import { Injectable } from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { DatabaseService } from '../database/database.service';

interface RoomRow extends RowDataPacket {
  room_id: number;
  room_number: string;
  status: string;
  type_id: number;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface RoomInput {
  room_number?: string;
  status?: string;
  type_id?: number;
}

@Injectable()
export class RoomsService {
  constructor(private readonly db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async createRoom(room: Required<RoomInput>) {
    const [result] = await this.pool()!.execute<ResultSetHeader>(
      'INSERT INTO room (room_number, status, type_id) VALUES (?, ?, ?)',
      [room.room_number, room.status, room.type_id],
    );
    return { room_id: result.insertId, ...room };
  }

  async getAll() {
    const [rows] = await this.pool()!.execute<RoomRow[]>(
      'SELECT room_id, room_number, status, type_id, created_at, updated_at FROM room',
    );
    return rows;
  }

  async findById(id: number) {
    const [rows] = await this.pool()!.execute<RoomRow[]>(
      'SELECT room_id, room_number, status, type_id, created_at, updated_at FROM room WHERE room_id = ?',
      [id],
    );
    return rows[0];
  }

  async updateRoom(id: number, partial: RoomInput) {
    const fields: string[] = [];
    const values: (string | number)[] = [];

    if (partial.room_number !== undefined) {
      fields.push('room_number = ?');
      values.push(partial.room_number);
    }
    if (partial.status !== undefined) {
      fields.push('status = ?');
      values.push(partial.status);
    }
    if (partial.type_id !== undefined) {
      fields.push('type_id = ?');
      values.push(partial.type_id);
    }
    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    await this.pool()!.execute(
      `UPDATE room SET ${fields.join(', ')} WHERE room_id = ?`,
      values,
    );
    return this.findById(id);
  }

  async deleteRoom(id: number) {
    const [result] = await this.pool()!.execute<ResultSetHeader>(
      'DELETE FROM room WHERE room_id = ?',
      [id],
    );
    return result.affectedRows > 0;
  }
}
