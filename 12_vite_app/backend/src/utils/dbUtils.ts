import { InArgs } from "@libsql/client";
import { db } from "../db";

type Args = InArgs;

export async function queryAll<T>(sql: string, args?: Args): Promise<T[]> {
  const result = args
    ? await db.execute({ sql, args })
    : await db.execute(sql);
  return result.rows as unknown as T[];
}

export async function queryOne<T>(sql: string, args: Args): Promise<T | null> {
  const result = await db.execute({ sql, args });
  const row = result.rows[0] as unknown as T | undefined;
  return row ?? null;
}

export async function execSQL(
  sql: string,
  args: Args
): Promise<{ rowsAffected: number; lastInsertRowid: number | null }> {
  const result = await db.execute({ sql, args });
  return {
    rowsAffected: result.rowsAffected,
    lastInsertRowid:
      result.lastInsertRowid != null ? Number(result.lastInsertRowid) : null,
  };
}
