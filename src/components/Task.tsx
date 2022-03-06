export interface TaskProps {
  task: {
    id: string;
    title: string;
    state: string;
    updateAt?: Date;
  };
  onArchiveTask?: () => void;
  onPinTask?: () => void;
}

export const Task = (props: TaskProps) => {
  return (
    <div className={"list-item"}>
      <input type={"text"} value={props.task.title} readOnly={true} />
    </div>
  );
};
