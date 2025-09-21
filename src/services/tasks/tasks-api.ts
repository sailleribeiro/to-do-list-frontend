import { api } from "@/lib/api";
import type { ListTasksResponse, Task } from "./tasks-types";

// GET /tasks
export async function getTasks(): Promise<ListTasksResponse[]> {
  const { data } = await api.get<ListTasksResponse[]>("/tasks");
  return data;
}

// POST /tasks
export async function createTask(task: Task): Promise<ListTasksResponse> {
  const { data } = await api.post<ListTasksResponse>("/tasks", task);
  return data;
}

// PATCH /tasks/:id/done
export async function markTaskAsDone(id: string): Promise<ListTasksResponse> {
  const { data } = await api.patch<ListTasksResponse>(`/tasks/${id}/done`);
  return data;
}

// DELETE /tasks/{id}
export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}
