import { taskService } from "@/services/tasks/tasks-api";
import type { Task, ListTasksResponse } from "@/services/tasks/tasks-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => taskService.createTask(task),
    onSuccess: (newTask: ListTasksResponse) => {
      queryClient.setQueryData<ListTasksResponse[]>(["tasks"], (oldTasks) => {
        return oldTasks ? [newTask, ...oldTasks] : [newTask];
      });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });
}
