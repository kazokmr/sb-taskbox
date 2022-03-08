import { TaskItem } from "../components/Task";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface TaskBox {
  tasks: TaskItem[];
  status: string;
  error?: string | null;
}

export interface UpdateTaskPayload {
  id: string;
  newTaskState: string;
}

export interface DataTask {
  id: string;
  title: string;
  completed: boolean;
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

export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = await response.json();
  const result: TaskItem[] = data.map((task: DataTask) => ({
    id: task.id,
    title: task.title,
    state: task.completed ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));
  return result;
});

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
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state,action) => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.tasks = [];
      });
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
