import store, { TaskBox } from "../lib/store";
import { TaskItem } from "./Task";

interface MockedTaskBox {
  tasks?: TaskItem[];
  status?: string;
  error?: string | null;
}

export const mockStore = (mockedArgs?: MockedTaskBox) => {
  return {
    ...store,
    getState: () => {
      return {
        ...store.getState(),
        taskbox: {
          ...store.getState().taskbox,
          tasks: mockedArgs?.tasks ? mockedArgs.tasks : templateTaskBox.tasks,
          status: mockedArgs?.status
            ? mockedArgs.status
            : templateTaskBox.status,
          error: mockedArgs?.error ? mockedArgs.error : templateTaskBox.error,
        },
      };
    },
  };
};

export const templateTask: TaskItem = {
  id: "1",
  title: "Task 1",
  state: "TASK_INBOX",
  updateAt: new Date(2022, 1, 10, 9, 0),
};

export const templateTaskBox: TaskBox = {
  tasks: [
    templateTask,
    { ...templateTask, id: "2", title: "Task 2" },
    { ...templateTask, id: "3", title: "Task 3" },
    { ...templateTask, id: "4", title: "Task 4" },
    { ...templateTask, id: "5", title: "Task 5" },
    { ...templateTask, id: "6", title: "Task 6" },
  ],
  status: "idle",
  error: null,
};
