import { InValue } from "@libsql/client";
import { queryAll, queryOne, execSQL } from "./dbUtils";

type Row = Record<string, InValue>;

export class Model<T extends Row> {
  constructor(private readonly table: string) {}

  findAll(): Promise<T[]> {
    return queryAll<T>(`SELECT * FROM ${this.table}`);
  }

  findById(id: number): Promise<T | null> {
    return queryOne<T>(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
  }

  async insert(data: Row): Promise<{ lastInsertRowid: number }> {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data).map(() => "?").join(", ");
    const { lastInsertRowid } = await execSQL(
      `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders})`,
      Object.values(data)
    );
    return { lastInsertRowid: lastInsertRowid! };
  }

  async update(id: number, data: Row): Promise<boolean> {
    const sets = Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(", ");
    const { rowsAffected } = await execSQL(
      `UPDATE ${this.table} SET ${sets} WHERE id = ?`,
      [...Object.values(data), id]
    );
    return rowsAffected > 0;
  }

  async remove(id: number): Promise<boolean> {
    const { rowsAffected } = await execSQL(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rowsAffected > 0;
  }
}
