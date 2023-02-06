import {TaskBox, UpdateTaskPayload} from "../lib/store";
import {TaskItem} from "./Task";
import {Provider} from "react-redux";
import {configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StoryFnReactReturnType} from "@storybook/react/dist/ts3.9/client/preview/types";

interface MockedTaskBox {
    tasks?: TaskItem[];
    status?: string;
    error?: string | null;
}

export const MockStore = ({
                              taskBoxState,
                              children
                          }: { taskBoxState: MockedTaskBox, children: StoryFnReactReturnType }) =>
    <Provider
        store={configureStore({
            reducer: {
                taskbox: createSlice({
                    name: 'taskbox',
                    initialState: taskBoxState,
                    reducers: {
                        updateTaskState: (state, action: PayloadAction<UpdateTaskPayload>) => {
                            const {id, newTaskState} = action.payload;
                            const task = state.tasks?.findIndex((task) => task.id === id) ?? -1;
                            if (task >= 0) {
                                state.tasks![task].state = newTaskState;
                            }
                        },
                    },
                }).reducer,
            },
        })}
    >
        {children}
    </Provider>

export const templateTask: TaskItem = {
    id: "1",
    title: "Task 1",
    state: "TASK_INBOX",
    updateAt: new Date(2022, 1, 10, 9, 0),
};

export const templateTaskBox: TaskBox = {
    tasks: [
        templateTask,
        {...templateTask, id: "2", title: "Task 2"},
        {...templateTask, id: "3", title: "Task 3"},
        {...templateTask, id: "4", title: "Task 4"},
        {...templateTask, id: "5", title: "Task 5"},
        {...templateTask, id: "6", title: "Task 6"},
    ],
    status: "idle",
    error: null,
};
