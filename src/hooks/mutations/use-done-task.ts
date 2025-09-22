import { taskService } from "@/services/tasks/tasks-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ListTasksResponse } from "@/services/tasks/tasks-types";

export function useDoneTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => taskService.markTaskAsDone(taskId),
    onSuccess: (updatedTask: ListTasksResponse) => {
      queryClient.setQueryData<ListTasksResponse[]>(["tasks"], (oldTasks) => {
        return oldTasks
          ? oldTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          : [];
      });
    },
    onError: (error) => {
      console.error("Error marking task as done:", error);
    },
  });
}
