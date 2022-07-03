import { FC, SyntheticEvent, useRef } from "react";
import { Input, Button } from "../";

type AddTaskFormProps = {
  addTaskHandler: (
    isCompleted: boolean,
    description: string,
    owner: string
  ) => void;
  handleAddTask: () => void;
};

const AddTaskForm: FC<AddTaskFormProps> = ({
  addTaskHandler,
  handleAddTask,
}) => {
  const isCompletedInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const ownerInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const isCompleted = isCompletedInputRef?.current?.checked ? true : false;
    const description = descriptionInputRef?.current?.value ?? "";
    const owner = ownerInputRef?.current?.value ?? "";
    addTaskHandler(isCompleted, description, owner);
    handleAddTask();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="isCompleted"
        label="Completed"
        type="checkbox"
        defaultValue={"false"}
        refVal={isCompletedInputRef}
        hasError={false}
        errorMsg="isCompletedInputError"
      />
      <Input
        name="description"
        label="Description"
        type="text"
        defaultValue=""
        refVal={descriptionInputRef}
        hasError={false}
        errorMsg="descriptionInputError"
      />
      <Input
        name="owner"
        label="Owner"
        type="text"
        defaultValue=""
        refVal={ownerInputRef}
        hasError={false}
        errorMsg="ownerInputError"
      />
      <Button type="submit" label="Add Task" />
    </form>
  );
};

export default AddTaskForm;
