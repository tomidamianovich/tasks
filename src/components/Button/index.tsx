import { FC } from "react";
import "./styles/index.scss";

type ButtonProps = {
  label: string;
  handleOnClick?: () => void;
  ariaLabel?: string;
  classes?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button: FC<ButtonProps> = ({
  label,
  handleOnClick,
  classes = "",
  ariaLabel = label,
  type = "button",
}) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={handleOnClick}
      type={type}
      className={`button ${classes}`}
    >
      {label}
    </button>
  );
};

export default Button;
