import { vi } from "vitest";

export const mockTaskService = {
  getTasks: vi.fn(),
  createTask: vi.fn(),
  markTaskAsDone: vi.fn(),
  deleteTask: vi.fn(),
};

export const taskService = mockTaskService;
