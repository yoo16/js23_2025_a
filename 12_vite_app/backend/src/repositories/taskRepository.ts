import { Task } from "../types";
import { Model } from "../utils/Model";

type TaskRow = {
  id: number;
  title: string;
  completed: number;
};

const taskModel = new Model<TaskRow>("tasks");

const toTask = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  completed: Boolean(row.completed),
});

export async function findAll(): Promise<Task[]> {
  const rows = await taskModel.findAll();
  return rows.map(toTask);
}

export async function findById(id: number): Promise<Task | null> {
  const row = await taskModel.findById(id);
  return row ? toTask(row) : null;
}

export async function create(title: string): Promise<Task> {
  const { lastInsertRowid } = await taskModel.insert({ title, completed: 0 });
  return { id: lastInsertRowid, title, completed: false };
}

export async function update(id: number, completed: boolean): Promise<boolean> {
  return taskModel.update(id, { completed: completed ? 1 : 0 });
}

export async function remove(id: number): Promise<boolean> {
  return taskModel.remove(id);
}
