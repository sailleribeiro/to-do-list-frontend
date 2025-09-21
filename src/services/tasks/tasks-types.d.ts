export interface ListTasksResponse {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
}

export interface Task {
  title: string;
  description: string;
}
