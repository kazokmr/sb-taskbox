import { Task, TaskItem } from "./Task";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

const meta: ComponentMeta<typeof Task> = {
  component: Task,
  title: "タスク",
};

export default meta;

export const Default: ComponentStoryObj<typeof Task> = {
  storyName: "デフォルト",
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
  storyName: "ピン留めした状態",
  args: {
    task: {
      ...(Default.args?.task as TaskItem),
      state: "TASK_PINNED",
    },
  },
};

export const Archived: ComponentStoryObj<typeof Task> = {
  storyName: "アーカイブした状態",
  args: {
    task: {
      ...(Default.args?.task as TaskItem),
      state: "TASK_ARCHIVED",
    },
  },
};

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle: ComponentStoryObj<typeof Task> = {
  storyName: "長い文章を表示した状態",
  args: {
    task: {
      ...(Default.args?.task as TaskItem),
      title: longTitleString,
    },
  },
};
