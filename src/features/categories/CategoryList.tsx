import {Box, Button, IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories, useDeleteCategoryMutation, useGetCategoriesQuery} from "./categorySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar} from "@mui/x-data-grid";
import {enqueueSnackbar} from "notistack";
import {useEffect} from "react";

export const CategoryList = () => {
  const {data, isFetching, error} = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  console.log(data);

  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  //create from catgories
  const rows: GridRowsProp = data ? data.items.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString("pt-BR")
  })) : [];

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

 async  function handlerDelete(id: string) {
    await deleteCategory({id});
  }

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Error fetching categories", {variant: "error"});
    }
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted successfully", {variant: "success"});
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar("Category not deleted", {variant: "error"});
    }

  }, [deleteCategoryStatus, error]);

  function renderNameCell() {
    return (rowData: GridRenderCellParams) => (
      <Link to={`/categories/edit/${rowData.id}`} style={{textDecoration: "none"}}>
        <Typography color="primary" >
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
          handlerDelete(row.id as string);
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
    <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{marginBottom: "1rem"}}
        >
          New Category
        </Button>

      </Box>
      <Box sx={{display: "flex", height: 600}}>
        <DataGrid
          components={{Toolbar: GridToolbar}}
          rowsPerPageOptions={[4, 10, 20]}
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableDensitySelector={true}
          // checkboxSelection={true}
          disableSelectionOnClick={true}

          pageSize={6}
          rows={rows}
          columns={columns}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {debounceMs: 500}
            }
          }}
        />
      </Box>
    </Box>
  );
};
