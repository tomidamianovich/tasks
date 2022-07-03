import { FC, SyntheticEvent, useRef } from "react";
import { Input, Button } from "../";

type AddTaskFormProps = {
  addTaskHandler: (description: string) => void;
  handleAddTask: () => void;
};

const AddTaskForm: FC<AddTaskFormProps> = ({
  addTaskHandler,
  handleAddTask,
}) => {
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const description = descriptionInputRef?.current?.value ?? "";
    addTaskHandler(description);
    handleAddTask();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="description"
        label="Description"
        type="text"
        defaultValue=""
        refVal={descriptionInputRef}
        hasError={false}
        errorMsg="descriptionInputError"
      />
      <Button type="submit" label="Add Task" />
    </form>
  );
};

export default AddTaskForm;
