import {TaskList} from "./TaskList";
import {ComponentMeta, ComponentStoryObj} from "@storybook/react";
import {MockStore, templateTaskBox} from "./MockedStore";

const meta: ComponentMeta<typeof TaskList> = {
    component: TaskList,
    title: "TaskList",
    decorators: [(story) => <div style={{padding: "3rem"}}>{story()}</div>],
};
export default meta;

export const Default: ComponentStoryObj<typeof TaskList> = {
    decorators: [
        (story) => <MockStore taskBoxState={templateTaskBox}>{story()}</MockStore>,
    ],
};

export const WithPinnedTasks: ComponentStoryObj<typeof TaskList> = {
    decorators: [
        (story) => {
            const pinnedTasks = [
                ...templateTaskBox.tasks.slice(0, 5),
                {id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED"},
            ];
            return <MockStore taskBoxState={{...templateTaskBox, tasks: pinnedTasks}}>{story()}</MockStore>
        },
    ],
};

export const Loading: ComponentStoryObj<typeof TaskList> = {
    decorators: [
        (story) => <MockStore taskBoxState={{...templateTaskBox, status: "loading"}}>{story()}</MockStore>
    ]
};

export const Empty: ComponentStoryObj<typeof TaskList> = {
    decorators: [
        (story) => <MockStore taskBoxState={{...templateTaskBox, tasks: []}}>{story()}</MockStore>
    ]
};
