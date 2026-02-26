import { Context } from "hono";
import * as taskService from "../services/taskService";

export async function index(c: Context) {
  const tasks = await taskService.getTasks();
  return c.json(tasks);
}

export async function create(c: Context) {
  const body = await c.req.json<{ title: string }>();
  const task = await taskService.addTask(body.title);
  return c.json(task);
}

export async function update(c: Context) {
  const id = Number(c.req.param("id"));
  const body = await c.req.json<{ completed: boolean }>();
  const task = await taskService.updateTask(id, body.completed);
  if (!task) return c.json({ error: "Not found" }, 404);
  return c.json(task);
}

export async function remove(c: Context) {
  const id = Number(c.req.param("id"));
  const ok = await taskService.deleteTask(id);
  if (!ok) return c.json({ error: "Not found" }, 404);
  return c.json({ success: true });
}
