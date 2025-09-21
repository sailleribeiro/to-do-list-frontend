import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/services/tasks/tasks-api";
import { toast } from "sonner";
import type { ListTasksResponse } from "@/services/tasks/tasks-types";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: (_, taskId) => {
      queryClient.setQueryData<ListTasksResponse[]>(["tasks"], (oldTasks) => {
        return oldTasks ? oldTasks.filter((task) => task.id !== taskId) : [];
      });
      toast.success("Task deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });
}
