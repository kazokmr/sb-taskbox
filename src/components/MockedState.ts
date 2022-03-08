import { TaskBox } from "../lib/store";
import * as TaskStories from "./Task.stories";
import { TaskItem } from "./Task";

export const MockedState: TaskBox = {
  tasks: [
    {
      ...(TaskStories.Default.args?.task as TaskItem),
      id: "1",
      title: "Task 1",
    },
    {
      ...(TaskStories.Default.args?.task as TaskItem),
      id: "2",
      title: "Task 2",
    },
    {
      ...(TaskStories.Default.args?.task as TaskItem),
      id: "3",
      title: "Task 3",
    },
    {
      ...(TaskStories.Default.args?.task as TaskItem),
      id: "4",
      title: "Task 4",
    },
    {
      ...(TaskStories.Default.args?.task as TaskItem),
      id: "5",
      title: "Task 5",
    },
    {
      ...(TaskStories.Default.args?.task as TaskItem),
      id: "6",
      title: "Task 6",
    },
  ],
  status: "idle",
  error: null,
};