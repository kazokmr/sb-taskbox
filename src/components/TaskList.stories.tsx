import { TaskList } from "./TaskList";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { mockStore, templateTaskBox } from "./MockedStore";

const meta: ComponentMeta<typeof TaskList> = {
  component: TaskList,
  title: "TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};
export default meta;

export const Default: ComponentStoryObj<typeof TaskList> = {
  decorators: [
    // (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
    (story) => <Provider store={mockStore()}>{story()}</Provider>,
  ],
};

export const WithPinnedTasks: ComponentStoryObj<typeof TaskList> = {
  decorators: [
    (story) => {
      const pinnedTasks = [
        ...templateTaskBox.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
      ];
      const mockedStoreHasPinnedTasks = mockStore({ tasks: pinnedTasks });
      return <Provider store={mockedStoreHasPinnedTasks}>{story()}</Provider>;
    },
  ],
};

export const Loading: ComponentStoryObj<typeof TaskList> = {
  decorators: [
    (story) => {
      const mockedStoreHasLoadingStatus = mockStore({ status: "loading" });
      return <Provider store={mockedStoreHasLoadingStatus}>{story()}</Provider>;
    },
  ],
};

export const Empty: ComponentStoryObj<typeof TaskList> = {
  decorators: [
    (story) => {
      const mockedStoreHasNoTasks = mockStore({ tasks: [] });
      return <Provider store={mockedStoreHasNoTasks}>{story()}</Provider>;
    },
  ],
};
