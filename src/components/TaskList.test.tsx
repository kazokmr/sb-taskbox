import {composeStories} from "@storybook/testing-react";
import * as TaskListStories from "./TaskList.stories";
import {render, screen} from "@testing-library/react";

// WithPinnedTasksストーリーを描画してテストに使う
const { WithPinnedTasks } = composeStories(TaskListStories);

test("ピン留めしたタスクがリストの最初に表示される", () => {
  render(<WithPinnedTasks />);
  const taskTitles = screen.queryAllByRole("textbox");
  expect(taskTitles[0]).toHaveValue("Task 6 (pinned)");
});
