import { TaskList } from "./TaskList";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import store, { TaskBox, UpdateTaskPayload } from "../lib/store";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskItem } from "./Task";
import { ReactNode } from "react";
import { MockedState } from "./MockedState";

const meta: ComponentMeta<typeof TaskList> = {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
  excludeStories: /.*MockedState$/,
};
export default meta;
export const Default: ComponentStoryObj<typeof TaskList> = {
  decorators: [
    // (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
    (story) => <Provider store={store}>{story()}</Provider>,
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
