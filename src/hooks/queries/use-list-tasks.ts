import { getTasks } from "@/services/tasks/tasks-api";
import { useQuery } from "@tanstack/react-query";

export function useListTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60 * 5,
  });
}
