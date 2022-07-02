import { FC } from "react";
import { Button } from "..";
import "./styles/index.scss";

type AddTaskForm = {
  handleAddTask: () => void;
};

const AddTaskForm: FC<AddTaskForm> = ({ handleAddTask }) => {
  return (
    <div className="add-task">
      <Button label="+ Add Task" handleOnClick={handleAddTask} />
    </div>
  );
};

export default AddTaskForm;
