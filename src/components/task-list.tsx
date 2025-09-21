import type { ListTasksResponse } from "@/services/tasks/tasks-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="relative p-4 border border-transparent hover:border-blue-500 hover:animate-border-spin"
        >
          <CardHeader>
            <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {task.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Button onClick={() => onToggleComplete(task.id)}>
              Mark as Complete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
