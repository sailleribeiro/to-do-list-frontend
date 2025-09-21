export interface ListTasksResponse {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
}

export interface CreateTask {
  title: string;
  description: string;
}
