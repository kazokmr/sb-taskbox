import { Task, TaskItem } from "./Task";

export interface TaskListProps {
  loading: boolean;
  tasks: Array<TaskItem>;
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

export const TaskList = ({
  loading = false,
  tasks,
  onPinTask,
  onArchiveTask,
}: TaskListProps) => {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  if (loading) {
    return <div className={"list-items"}>loading</div>;
  }

  if (tasks.length === 0) {
    return <div className={"list-items"}>empty</div>;
  }

  return (
    <div className={"list-items"}>
      {tasks.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
};
