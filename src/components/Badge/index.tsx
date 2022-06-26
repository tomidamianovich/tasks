import { FC } from "react";

type BadgeProps = {
  value: string;
  type: string;
};

const Badge: FC<BadgeProps> = ({ type, value }) => (
  <div className={type}>{value}</div>
);

export default Badge;
