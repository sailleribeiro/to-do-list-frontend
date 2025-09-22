import { api } from "@/lib/api";
import type { ListTasksResponse, Task } from "./tasks-types";

export const taskService = {
  // GET /tasks
  async getTasks(): Promise<ListTasksResponse[]> {
    const { data } = await api.get<ListTasksResponse[]>("/tasks");
    return data;
  },

  // POST /tasks
  async createTask(task: Task): Promise<ListTasksResponse> {
    const { data } = await api.post<ListTasksResponse>("/tasks", task);
    return data;
  },

  // PATCH /tasks/:id/done
  async markTaskAsDone(id: string): Promise<ListTasksResponse> {
    const { data } = await api.patch<ListTasksResponse>(`/tasks/${id}/done`);
    return data;
  },

  // DELETE /tasks/{id}
  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
