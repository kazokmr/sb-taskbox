import {useDispatch, useSelector} from "react-redux";
import {fetchTasks, RootState} from "../lib/store";
import {useEffect} from "react";
import {TaskList} from "./TaskList";

export const InboxScreen = () => {
    const dispatch = useDispatch();
    const {error} = useSelector((state: RootState) => state.taskbox);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchTasks())
    }, []);

    if (error) {
        return (
            <div className={"page lists-show"}>
                <div className={"wrapper-message"}>
                    <span className={"icon-face-sad"}/>
                    <div className={"title-message"}>Oh no!</div>
                    <div className={"subtitle-message"}>{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className={"page lists-show"}>
            <nav>
                <h1 className={"title-page"}>
                    <span className={"title-wrapper"}>Taskbox</span>
                </h1>
            </nav>
            <TaskList/>
        </div>
    );
};
