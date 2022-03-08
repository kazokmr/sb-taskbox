import { TaskItem } from "../components/Task";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskBox {
  tasks: TaskItem[];
  status: string;
  error?: string | null;
}

export interface UpdateTaskPayload {
  id: string;
  newTaskState: string;
}

const defaultTasks: TaskItem[] = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

const taskBoxData: TaskBox = {
  tasks: defaultTasks,
  status: "idle",
  error: null,
};

const TasksSlice = createSlice({
  name: "taskbox",
  initialState: taskBoxData,
  reducers: {
    updateTaskState: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex((task) => task.id === id);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },
});

export const { updateTaskState } = TasksSlice.actions;

const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
