import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useListTasks } from "@/hooks/queries/use-list-tasks";
import { TaskList } from "@/components/task-list";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/mutations/use-create-task";
import { toast } from "sonner";
import type { ListTasksResponse } from "@/services/tasks/tasks-types";
import { TaskSkeleton } from "@/components/skeleton/task-skeleton";
import { Plus, X } from "lucide-react";
import { DropdownUser } from "@/components/dropdown-user";
import { ModeToggle } from "@/components/mode-toggle";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const activeTabs = {
  INCOMPLETE: "incomplete",
  COMPLETE: "complete",
};

export type ActiveTabs = (typeof activeTabs)[keyof typeof activeTabs];

export function Tasks() {
  const { data: tasks, isLoading } = useListTasks();
  const createTaskMutation = useCreateTask();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(activeTabs.INCOMPLETE);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (!newTaskTitle.trim() || !newTaskDescription.trim()) {
      toast.warning("Title and description cannot be empty");
      return;
    }

    createTaskMutation.mutate(
      { title: newTaskTitle, description: newTaskDescription },
      {
        onSuccess: () => {
          toast.success("Task created successfully");
          setNewTaskTitle("");
          setNewTaskDescription("");
        },
        onError: () => {
          toast.error("Failed to create task");
        },
      }
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task: ListTasksResponse) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const displayedTasks = filteredTasks.filter((task: ListTasksResponse) =>
    activeTab === activeTabs.INCOMPLETE ? !task.done : task.done
  );

  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Tasks Page</h1>

        <div className="flex flex-row items-center gap-2 cursor-pointer bg-accent p-2 rounded-full hover:opacity-80 transition">
          <ModeToggle />
          <DropdownUser />
        </div>
      </div>

      {isLoading ? (
        <TaskSkeleton />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={handleSearch}
              className=" w-full md:w-1/4"
            />
            {search && (
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    onClick={() => setSearch("")}
                    className="w-full md:w-auto"
                  >
                    <X />
                    <p className="md:hidden">clean filter</p>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>clean filter</p>
                </TooltipContent>
              </Tooltip>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button>
                  <Plus />
                  Add Task
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add New Task</SheetTitle>
                  <SheetDescription>
                    Fill in the details below to create a new task.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 p-4">
                  <Input
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Task Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                </div>
                <SheetFooter>
                  <Button
                    onClick={handleAddTask}
                    disabled={createTaskMutation.isPending}
                  >
                    {createTaskMutation.isPending
                      ? "Creating..."
                      : "Create Task"}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="incomplete">Not completed</TabsTrigger>
              <TabsTrigger value="complete">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="incomplete">
              {displayedTasks.length > 0 ? (
                <TaskList tasks={displayedTasks} />
              ) : (
                <p>No incomplete tasks found.</p>
              )}
            </TabsContent>
            <TabsContent value="complete">
              {displayedTasks.length > 0 ? (
                <TaskList tasks={displayedTasks} />
              ) : (
                <p>No completed tasks found.</p>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
