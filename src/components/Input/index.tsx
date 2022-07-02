import { FC } from "react";
import { Badge } from "..";

type InputProps = {
  name: string;
  label: string;
  type: string;
  refVal: React.RefObject<HTMLInputElement>;
  hasError: boolean;
  errorMsg: string;
  className?: string;
};

const Input: FC<InputProps> = ({
  name,
  label,
  type,
  refVal,
  hasError,
  errorMsg,
  className,
}) => (
  <div className={className}>
    <label htmlFor={name}>{label}</label>
    <input type={type} ref={refVal} />
    {hasError && <Badge type="error" value={errorMsg} />}
  </div>
);

export default Input;
