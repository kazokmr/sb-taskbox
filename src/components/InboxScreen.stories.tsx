import { InboxScreen } from "./InboxScreen";
import { Provider } from "react-redux";
import store from "../lib/store";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { rest } from "msw";
import { MockedState } from "./TaskList.stories";

export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof InboxScreen>;

export const Default: ComponentStoryObj<typeof InboxScreen> = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          (req, res, ctx) => {
            return res(ctx.json(MockedState.tasks));
          }
        ),
      ],
    },
  },
};
export const Error: ComponentStoryObj<typeof InboxScreen> = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          (req, res, ctx) => {
            return res(ctx.status(403));
          }
        ),
      ],
    },
  },
};
