import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {CategoryForm} from "./CategoryForm";

const Props = {
  category: {
    id: "123",
    name: "test",
    description: "test",
    is_active: true,
    created_at: "2021-03-01T00:00:00.000000Z",
    updated_at: "2021-03-01T00:00:00.000000Z",
    deleted_at: null,
  },
  isdisabled: false,
  isLoading: false,
  handleSubmit: () => {},
  handleChange: () => {},
  handleToggle: () => {},
};

describe("CategoryFrom", () => {
  it("should render correctly", () => {
    // @ts-ignore
    const { asFragment } = render(<CategoryForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
