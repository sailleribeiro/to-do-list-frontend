import { createTask } from "@/services/tasks/tasks-api";
import type { Task } from "@/services/tasks/tasks-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Task) => createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });
}
