import { api } from "@/lib/api";
import type { ListTasksResponse } from "./tasks-types";

// GET /tasks
export async function getTasks(): Promise<ListTasksResponse[]> {
  const { data } = await api.get<ListTasksResponse[]>("/tasks");
  return data;
}

// GET /tasks/:id
export async function getTaskById(id: string): Promise<any> {
  const { data } = await api.get<any>(`/tasks/${id}`);
  return data;
}

// POST /tasks
export async function createTask(task: any): Promise<any> {
  const { data } = await api.post<any>("/tasks", task);
  return data;
}

// PATCH /tasks/:id/done
export async function markTaskAsDone(id: string): Promise<any> {
  const { data } = await api.patch<any>(`/tasks/${id}/done`);
  return data;
}
