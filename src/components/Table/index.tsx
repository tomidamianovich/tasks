import { FC, ReactElement } from "react";
import "./styles/index.scss";

type TableProps = {
  children: ReactElement;
  headings: string[];
};

const Table: FC<TableProps> = ({ children, headings }) => (
  <table>
    <tr>
      {headings.map((header: string) => (
        <th>{header}</th>
      ))}
    </tr>
    {children}
  </table>
);
export default Table;
