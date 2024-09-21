import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {CastMembersTable} from "./CastMembersTable";

const Props = {
    items: [
      {
        id: "123",
        type: 1,
        name: "test",
        deleted_at: null,
        created_at: "2021-03-01T00:00:00.000000Z",
        updated_at: "2021-03-01T00:00:00.000000Z",
      },
    ],
    currentPage: 1,
    perPage: 1,
    total: 1,
  };

describe("CastMembersTable", () => {
  it("should render castMember talbe correcly", () => {
    // @ts-ignore
    const {asFragment} = render(<CastMembersTable {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMembersTable with loading", () => {
    // @ts-ignore
    const {asFragment} = render(<CastMembersTable {...Props} isFetching/>, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render corret type", () => {
    const {asFragment} = render(
      <CastMembersTable data={{...Props} as any} perPage={15} isFetching={false} rowsPerPage={[15, 25, 50]}
                        handleOnPageChange={() => {
                        }} handleFilterChange={() => {
      }} handleOnPageSizeChange={() => {
      }} handleDelete={() => {
      }}/>,

      {
        wrapper: BrowserRouter,
      }
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
