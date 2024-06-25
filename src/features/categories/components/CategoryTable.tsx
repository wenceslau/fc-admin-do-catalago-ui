import {Results} from "../../../types/Category";
import {GridFilterModel} from "@mui/x-data-grid";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number;

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
}

export function CategoryTable({
                                data,
                                perPage,
                                isFetching,
                                rowsPerPage = 10,
                                handleOnPageChange,
                                handleFilterChange,
                                handleOnPageSizeChange,
                                handleDelete
                              }: Props) {
  return (
    <div>
      <h1>Category Table</h1>
    </div>
  );
}
