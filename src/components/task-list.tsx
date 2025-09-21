import type { ListTasksResponse } from "@/services/tasks/tasks-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";

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
          className={`relative border border-transparent hover:border-blue-500 hover:animate-border-spin ${
            task.done ? "opacity-50 pointer-events-none" : ""
          } group`} // Adiciona a classe "group" para o hover
        >
          <CardHeader>
            <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {task.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            {!task.done && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button onClick={() => onToggleComplete(task.id)}>
                  <CheckCircle />
                  Conclude
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
