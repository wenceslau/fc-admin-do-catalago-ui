import {Box, Paper, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CategoryForm} from "./components/CategoryForm";
import {useSnackbar} from "notistack";
import {Category} from "../../types/Category";
import {useGetCategoryQuery, useUpdateCategoryMutation} from "./categorySlice";

export const CategoryEdit = () => {
  const id = useParams().id || "";
  const {enqueueSnackbar} = useSnackbar();
  const {data: category, isFetching} = useGetCategoryQuery({id});
  const [isDisabled, setIsDisabled] = useState(false);
  const [updateCategory, status] = useUpdateCategoryMutation();
  const [categoryState, setCategoryState] = useState<Category>({
    id: "",
    name: "",
    is_active: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
    description: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCategory(categoryState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setCategoryState({...categoryState, [name]: value});
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    setCategoryState({...categoryState, [name]: checked});
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Category updated successfully", {variant: "success"});
      setIsDisabled(false);
    }
    if (status.error) {
      enqueueSnackbar("Category not updated", {variant: "error"});
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Paper>

      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h4">
            Edit Category
          </Typography>
        </Box>

        <CategoryForm
          category={categoryState}
          isDisabled={status.isLoading || isDisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
          isLoading={isFetching}
        />

      </Box>

    </Paper>
  );
};
