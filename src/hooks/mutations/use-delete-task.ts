import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/services/tasks/tasks-api";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: (taskId) => {
      queryClient.setQueryData(["tasks"], (oldTasks: any) => {
        return oldTasks
          ? oldTasks.filter((task: any) => task.id !== taskId)
          : [];
      });
    },
  });
}
