import { Task, TaskItem } from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateTaskState } from "../lib/store";

export interface TaskListProps {
  loading: boolean;
  tasks: Array<TaskItem>;
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

export const TaskList = () => {
  const tasks = useSelector((state: RootState) => {
    const taskInOrder = [
      ...state.taskbox.tasks.filter(
        (task: TaskItem) => task.state === "TASK_PINNED"
      ),
      ...state.taskbox.tasks.filter(
        (task: TaskItem) => task.state !== "TASK_PINNED"
      ),
    ];
    return taskInOrder.filter(
      (task: TaskItem) =>
        task.state === "TASK_INBOX" || task.state === "TASK_PINNED"
    );
  });

  const { status } = useSelector((state: RootState) => state.taskbox);

  const dispatch = useDispatch();

  const pinTask = (id: string) => {
    dispatch(updateTaskState({ id, newTaskState: "TASK_PINNED" }));
  };

  const archiveTask = (id: string) => {
    dispatch(updateTaskState({ id, newTaskState: "TASK_ARCHIVED" }));
  };

  const LoadingRow = (
    <div className={"loading-item"}>
      <span className={"glow-checkbox"} />
      <span className={"glow-text"}>
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === "loading") {
    return (
      <div className={"list-items"} data-testid={"loading"} key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className={"list-items"} data-testid={"empty"} key={"empty"}>
        <div className={"wrapper-message"}>
          <span className={"icon-check"} />
          <div className={"title-message"}>You have no tasks</div>
          <div className={"subtitle-message"}>Sit back and relax</div>
        </div>
      </div>
    );
  }

  return (
    <div className={"list-items"} data-testid={"success"} key={"success"}>
      {tasks.map((task: TaskItem) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(id: string) => pinTask(id)}
          onArchiveTask={(id: string) => archiveTask(id)}
        />
      ))}
    </div>
  );
};
