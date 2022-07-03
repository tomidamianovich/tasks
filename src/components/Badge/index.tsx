import { FC } from "react";

type BadgeProps = {
  value: string;
  type: string;
  error: boolean;
};

const Badge: FC<BadgeProps> = ({ type, value, error }) =>
  error ? <div className={type}>{value}</div> : null;

export default Badge;
