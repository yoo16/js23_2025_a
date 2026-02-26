import { Task } from "../types";
import * as taskRepository from "../repositories/taskRepository";

export async function getTasks(): Promise<Task[]> {
  return taskRepository.findAll();
}

export async function addTask(title: string): Promise<Task> {
  return taskRepository.create(title);
}

export async function updateTask(id: number, completed: boolean): Promise<Task | null> {
  const ok = await taskRepository.update(id, completed);
  if (!ok) return null;
  return taskRepository.findById(id);
}

export async function deleteTask(id: number): Promise<boolean> {
  return taskRepository.remove(id);
}
