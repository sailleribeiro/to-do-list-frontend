import type { ListTasksResponse } from "../../../services/tasks/tasks-types";

export const mockTasks: ListTasksResponse[] = [
  {
    id: "1",
    title: "Tarefa 1",
    description: "Descrição da tarefa 1",
    done: false,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Tarefa 2",
    description: "Descrição da tarefa 2",
    done: true,
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    title: "Tarefa 3",
    description: "Descrição da tarefa 3",
    done: false,
    createdAt: "2024-01-03",
  },
];

export const emptyTasks: ListTasksResponse[] = [];

export const singleTask: ListTasksResponse = {
  id: "test-1",
  title: "Tarefa de Teste",
  description: "Descrição de teste",
  done: false,
  createdAt: "2024-01-01",
};
