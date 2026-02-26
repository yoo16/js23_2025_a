import { db } from "../db";
import { Task } from "../types";

type TaskRow = {
  id: number;
  title: string;
  completed: number;
};

const toTask = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  completed: Boolean(row.completed),
});

export async function findAll(): Promise<Task[]> {
  const result = await db.execute("SELECT * FROM tasks");
  return (result.rows as unknown as TaskRow[]).map(toTask);
}

export async function findById(id: number): Promise<Task | null> {
  const result = await db.execute({
    sql: "SELECT * FROM tasks WHERE id = ?",
    args: [id],
  });
  const row = result.rows[0] as unknown as TaskRow | undefined;
  return row ? toTask(row) : null;
}

export async function create(title: string): Promise<Task> {
  const result = await db.execute({
    sql: "INSERT INTO tasks (title, completed) VALUES (?, ?)",
    args: [title, 0],
  });
  return { id: Number(result.lastInsertRowid), title, completed: false };
}

export async function update(id: number, completed: boolean): Promise<boolean> {
  const result = await db.execute({
    sql: "UPDATE tasks SET completed = ? WHERE id = ?",
    args: [completed ? 1 : 0, id],
  });
  return result.rowsAffected > 0;
}

export async function remove(id: number): Promise<boolean> {
  const result = await db.execute({
    sql: "DELETE FROM tasks WHERE id = ?",
    args: [id],
  });
  return result.rowsAffected > 0;
}
