import type { ListTasksResponse } from "@/services/tasks/tasks-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, Trash2 } from "lucide-react";
import { useDoneTask } from "@/hooks/mutations/use-done-task";
import { useDeleteTask } from "@/hooks/mutations/use-delete-task";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

export function TaskList({ tasks }: { tasks: ListTasksResponse[] }) {
  const { mutate: markAsDone, isPending } = useDoneTask();
  const deleteUserMutation = useDeleteTask();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (taskId: string) => {
    setOpenModal(true);
    setSelectedTaskId(taskId);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteUserMutation.mutate(taskId, {
      onSuccess: () => {
        setSelectedTaskId(null);
        setOpenModal(false);
        toast.success("Task deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete task");
      },
    });
  };

  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`relative border border-transparent hover:border-blue-500 hover:animate-border-spin ${
              task.done ? "opacity-50" : ""
            } group`}
          >
            <CardHeader>
              <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                {task.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              {!task.done && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={() => markAsDone(task.id)}
                    disabled={isPending}
                  >
                    <CheckCircle />
                    {isPending ? "Marking..." : "Conclude"}
                  </Button>
                </div>
              )}
              <Button
                variant="destructive"
                onClick={() => handleOpenModal(task.id)}
              >
                <Trash2 />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setSelectedTaskId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedTaskId) {
                  handleDeleteTask(selectedTaskId);
                }
              }}
              disabled={deleteUserMutation.isPending}
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
