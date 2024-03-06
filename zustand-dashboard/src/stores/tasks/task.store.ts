import { StateCreator, create } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";

interface TaskState {
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TaskStatus) => Task[];
}

const filterTask = (status: any, tasks: any) => {
  const newTasks = tasks.find((element: any) => (element.status = status));

  console.log(newTasks);
  return null;
};

const storeApi: StateCreator<TaskState> = (set) => ({
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },

  getTaskByStatus: (status: TaskStatus) => [],
});

export const useTaskStore = create<TaskState>()(storeApi);
