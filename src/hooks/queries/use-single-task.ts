import { getTaskById } from "@/services/tasks/tasks-api";
import { useQuery } from "@tanstack/react-query";

export function useTask(id: string) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
