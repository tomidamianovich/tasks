import { render } from "@testing-library/react";
import Main from "..";

test("renders learn react link", () => {
  const app = render(<Main />);
  expect(app).toMatchSnapshot();
});
