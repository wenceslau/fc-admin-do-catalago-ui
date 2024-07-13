import {Box, Button} from "@mui/material";
import {Link} from "react-router-dom";
import {useDeleteCategoryMutation, useGetCategoriesQuery} from "./categorySlice";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {CategoryTable} from "./components/CategoryTable";
import {GridFilterModel} from "@mui/x-data-grid";

export const CategoryList = () => {
  const {data, isFetching, error} = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const {enqueueSnackbar} = useSnackbar();
  const [options, setOptions] = useState({
    page: 1,
    search: "",
    perPage: 5,
    rowsPerPage: [5, 10, 20],
  });

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, search: "" });
    }

    const search = filterModel.quickFilterValues.join("");
    setOptions({ ...options, search });
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
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
  }, [deleteCategoryStatus, error, enqueueSnackbar]);

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
      <CategoryTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
