import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useListTasks } from "@/hooks/queries/use-list-tasks";
import { TaskList } from "@/components/task-list";

export function Tasks() {
  const { data: tasks } = useListTasks();
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState("incomplete");

  const handleAddTask = () => {
    if (!newTask.trim()) {
      console.log("Task cannot be empty");
      return;
    }
    console.log("Adding task:", newTask);
    setNewTask("");
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
    activeTab === "incomplete" ? !task.completed : task.completed
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks Page</h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearch}
        />
        <Input
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={handleAddTask}>Add</Button>
      </div>

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
