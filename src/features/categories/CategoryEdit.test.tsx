import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "../../utils/test-utils";
import {baseURL} from "../api/apiSlice";
import {CategoryEdit} from "./CategoryEdit";


const data = {
  id: "1",
  name: "Category 1",
  is_active: true,
  deleted_at: null,
  created_at: "2022-09-27T17:10:33+0000",
  updated_at: "2022-09-27T17:10:33+0000",
};

export const handlers = [
  rest.get(`${baseURL}/categories/undefined`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.json({ data }));
  }),
  rest.put(`${baseURL}/categories/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200));
  }),
];

const server = setupServer(...handlers);

describe("EditCategory", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CategoryEdit />);
    expect(asFragment()).toMatchSnapshot();
  });

});
