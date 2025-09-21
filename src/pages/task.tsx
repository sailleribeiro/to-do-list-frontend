import { useListTasks } from "@/hooks/queries/use-list-tasks";

export function Tasks() {
  const { data } = useListTasks();
  console.log(data);
  return <div>Tasks Page</div>;
}
