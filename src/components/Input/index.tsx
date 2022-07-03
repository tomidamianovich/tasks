import { FC, useState } from "react";
import "./styles/index.scss";
import { Badge } from "..";

type InputProps = {
  name: string;
  label: string;
  type: string;
  refVal: React.RefObject<HTMLInputElement>;
  hasError: boolean;
  errorMsg: string;
  className?: string;
  required?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
};

const Input: FC<InputProps> = ({
  name,
  label,
  type,
  refVal,
  hasError,
  required,
  errorMsg,
  className,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        ref={refVal}
        {...(type === "checkbox" && { value })}
        {...(type !== "checkbox" && { defaultValue })}
        onChange={handleChange}
        required={required}
      />
      <Badge type="error" value={errorMsg} error={hasError} />
    </div>
  );
};

export default Input;
