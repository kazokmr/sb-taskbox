import { Task } from "./Task";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: Task,
  title: "Task",
} as ComponentMeta<typeof Task>;

export const Default: ComponentStoryObj<typeof Task> = {
  args: {
    task: {
      id: "1",
      title: "Test Task",
      state: "TASK_INBOX",
      updateAt: new Date(2021, 0, 1, 9, 0),
    },
  },
};

export const Pinned: ComponentStoryObj<typeof Task> = {
  args: {
    task: {
      ...Default.args?.task,
      state: "TASK_PINNED",
    },
  },
};

export const Archived: ComponentStoryObj<typeof Task> = {
  args: {
    task: {
      ...Default.args?.task,
      state: "TASK_ARCHIVED",
    },
  },
};
