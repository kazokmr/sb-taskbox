import {InboxScreen} from "./InboxScreen";
import {Provider} from "react-redux";
import store from "../lib/store";
import {ComponentMeta, ComponentStoryObj} from "@storybook/react";
import {rest} from "msw";
import {userEvent, waitFor, waitForElementToBeRemoved, within,} from "@storybook/testing-library";
import {templateTaskBox} from "./MockedStore";

const meta: ComponentMeta<typeof InboxScreen> = {
    component: InboxScreen,
    title: "InboxScreen",
    decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};
export default meta;

export const Default: ComponentStoryObj<typeof InboxScreen> = {
    parameters: {
        msw: {
            handlers: [
                rest.get(
                    "https://jsonplaceholder.typicode.com/todos?userId=1",
                    (req, res, ctx) =>
                        res(
                            ctx.delay(5),
                            ctx.json(templateTaskBox.tasks))
                ),
            ],
        },
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        await waitForElementToBeRemoved(await canvas.findByTestId("loading"));

        await waitFor(async () => {
            await userEvent.click(canvas.getByLabelText("pinTask-1"));
            await userEvent.click(canvas.getByLabelText("pinTask-3"));
        });
    },
};

export const Error: ComponentStoryObj<typeof InboxScreen> = {
    parameters: {
        msw: {
            handlers: [
                rest.get(
                    "https://jsonplaceholder.typicode.com/todos?userId=1",
                    (req, res, ctx) =>
                        res(ctx.status(403))
                ),
            ],
        },
    },
};
