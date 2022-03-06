import { Task, TaskProps } from "./Task";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  component: Task,
  title: "Task",
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updateAt: new Date(2021, 0, 1, 9, 0),
  },
} as TaskProps;

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: "TASK_PINNED",
  },
} as TaskProps;

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: "TASK_ARCHIVED",
  },
} as TaskProps;
