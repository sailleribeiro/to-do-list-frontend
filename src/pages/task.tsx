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

const activeTabs = {
  INCOMPLETE: "incomplete",
  COMPLETE: "complete",
};

export type ActiveTabs = (typeof activeTabs)[keyof typeof activeTabs];

export function Tasks() {
  const { data: tasks } = useListTasks();
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
    console.log("Searching for:", e.target.value);
  };

  const handleToggleComplete = (taskId: string) => {
    console.log("Toggling task completion for:", taskId);
  };

  const filteredTasks =
    tasks?.filter((task: any) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const displayedTasks = filteredTasks.filter((task: any) =>
    activeTab === activeTabs.INCOMPLETE ? !task.completed : task.completed
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks Page</h1>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearch}
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Task</Button>
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
                {createTaskMutation.isPending ? "Creating..." : "Create Task"}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
          <TabsTrigger value="complete">Complete</TabsTrigger>
        </TabsList>

        <TabsContent value="incomplete">
          <TaskList
            tasks={displayedTasks}
            onToggleComplete={handleToggleComplete}
          />
        </TabsContent>
        <TabsContent value="complete">
          <TaskList
            tasks={displayedTasks}
            onToggleComplete={handleToggleComplete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
