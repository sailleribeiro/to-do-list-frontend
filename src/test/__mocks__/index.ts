// Dados mock
export * from "./data/mock-tasks";

// Hooks mock
export * from "./hooks/mutations/use-done-task";
export * from "./hooks/mutations/use-delete-task";

// Services mock
export * from "./services/tasks/tasks-api";

export { mockTasks, emptyTasks, singleTask } from "./data/mock-tasks";
export { mockUseDoneTask } from "./hooks/mutations/use-done-task";
export { mockUseDeleteTask } from "./hooks/mutations/use-delete-task";
export { mockTaskService } from "./services/tasks/tasks-api";
