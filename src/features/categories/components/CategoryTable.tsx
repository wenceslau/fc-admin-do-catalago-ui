import {Category, Categories} from "../../../types/Category";
import {DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridToolbar} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {Box, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  data: Categories | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
}

export function CategoryTable(
  {
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete
  }: Props) {

  const componentsProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {debounceMs: 500}
    }
  };

  const columns: GridColDef[] = [
    {field: "id", headerName: "ID", flex: 1},
    {
      field: "name", headerName: "Name", flex: 1,
      renderCell: renderNameCell()
    },
    {field: "description", headerName: "Description", flex: 1},
    {
      field: "isActive", headerName: "Active", flex: 1, type: "boolean",
      renderCell: renderIsActiveCell,
    },
    {field: "createdAt", headerName: "Created At", flex: 1},
    {
      field: "actions", headerName: "Actions", flex: 1,
      renderCell: renderActionsCell
    }
  ];

  const rows = data ? mapDataToGridRows(data) : [];

  const rowCount = data?.total || 0;

  function mapDataToGridRows(items: Categories) {
    const {items: categories} = items;
    return categories.map((category: Category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.is_active,
      createdAt: new Date(category.created_at).toLocaleDateString("pt-BR")
    }));
  }

  function renderNameCell() {
    return (rowData: GridRenderCellParams) => (
      <Link to={`/categories/edit/${rowData.id}`} style={{textDecoration: "none"}}>
        <Typography color="primary">
          {rowData.value}
        </Typography>
      </Link>
    );
  }

  function renderActionsCell(row: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => {
          console.log(row);
          handleDelete(row.id as string);
        }}
        aria-label="Delete"
      >
        <DeleteIcon/>
      </IconButton>
    );
  }

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? "primary" : "error"}>
        {row.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  return (
    <Box sx={{display: "flex", height: 600}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={perPage}
        rowCount={rowCount}
        loading={isFetching}
        rowsPerPageOptions={rowsPerPage}
        componentsProps={componentsProps}
        filterMode="server"
        paginationMode="server"
        checkboxSelection={false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableSelectionOnClick={true}
        components={{Toolbar: GridToolbar}}
        onPageChange={handleOnPageChange}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  );
}
