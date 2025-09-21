import type { ListTasksResponse } from "@/services/tasks/tasks-types";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

export function TaskList({
  tasks,
  onToggleComplete,
}: {
  tasks: ListTasksResponse[];
  onToggleComplete: (taskId: string) => void;
}) {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <Card key={task.id} className="flex gap-2">
          <CardContent className="flex items-center gap-4">
            <Checkbox
              checked={task.done}
              onCheckedChange={() => onToggleComplete(task.id)}
            />
            <span>{task.title}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
