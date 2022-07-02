import { FC } from "react";
import "./styles/index.scss";

type TableProps = {
  children: JSX.Element;
  headings: string[];
};

const Table: FC<TableProps> = ({ children, headings }) => (
  <table>
    <thead>
      <tr>
        {headings.map((header: string, index: number) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);
export default Table;
