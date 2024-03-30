import { StateCreator, create } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
//import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

  setDragginTaskId: (taskId: string) => void;
  removeDragginTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

//
const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "done" },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status };

    // Forma nativa de Zustand immer Middleware
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    /* //Forma nativa de Zustand
    set(
      produce((state: TaskState) => {
        state.tasks[newTask.id] = newTask;
      })
    );
    */
    /* //Forma nativa de Zustand
    set((state) => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask, //
      },
    }));
    */
  },

  setDragginTaskId: (taskId: string) => set({ draggingTaskId: taskId }),

  removeDragginTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // mi solucion
    set((state) => {
      state.tasks[taskId].status = status;
    });

    //solucion del profesor
    /*
    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status,
      };
    });
    */

    /*
    const task = get().tasks[taskId];
    task.status = status;
    
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));*/
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDragginTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(immer(storeApi), {
      name: "task-store",
      //storage: createJSONStorage(() => sessionStorage),
    })
  )
);
