import { TaskList } from "./TaskList";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import * as TaskStories from "./Task.stories";
import { TaskBox, UpdateTaskPayload } from "../lib/store";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskItem } from "./Task";
import { ReactNode } from "react";

export const MockedState: TaskBox = {
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
  ],
  status: "idle",
  error: null,
};

const Mockstore = ({
  taskboxState,
  children,
}: {
  taskboxState: TaskBox;
  children: ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: "taskbox",
          initialState: taskboxState,
          reducers: {
            updateTaskState: (
              state,
              action: PayloadAction<UpdateTaskPayload>
            ) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex(
                (task: TaskItem) => task.id === id
              );
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);
export default {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
  excludeStories: /.*MockedState$/,
} as ComponentMeta<typeof TaskList>;

export const Default: ComponentStoryObj<typeof TaskList> = {
  decorators: [
    (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
  ],
};

export const WithPinnedTasks: ComponentStoryObj<typeof TaskList> = {
  decorators: [
    (story) => {
      const pinnedTasks = [
        ...MockedState.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
      ];
      return (
        <Mockstore taskboxState={{ ...MockedState, tasks: pinnedTasks }}>
          {story()}
        </Mockstore>
      );
    },
  ],
};

export const Loading: ComponentStoryObj<typeof TaskList> = {
  decorators: [
    (story) => (
      <Mockstore taskboxState={{ ...MockedState, status: "loading" }}>
        {story()}
      </Mockstore>
    ),
  ],
};

export const Empty: ComponentStoryObj<typeof TaskList> = {
  decorators: [
    (story) => (
      <Mockstore taskboxState={{ ...MockedState, tasks: [] }}>
        {story()}
      </Mockstore>
    ),
  ],
};
