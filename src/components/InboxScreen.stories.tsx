import { InboxScreen } from "./InboxScreen";
import { Provider } from "react-redux";
import store from "../lib/store";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
} as ComponentMeta<typeof InboxScreen>;

export const Default: ComponentStoryObj<typeof InboxScreen> = {};
export const Error: ComponentStoryObj<typeof InboxScreen> = {};
