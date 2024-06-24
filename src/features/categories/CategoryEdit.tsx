import {Box, Paper, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Category, selectCategoryById, updateCategory} from "./categorySlice";
import React, {useState} from "react";
import {CategoryForm} from "./components/CategoryForm";
import {useSnackbar} from "notistack";

export const CategoryEdit = () => {

  const id = useParams().id || "";
  const category = useAppSelector((state) => selectCategoryById(state, id));

  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>(category);

  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    console.log(name, value);
    setCategoryState({...categoryState, [name]: value});
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    console.log(name, checked);
    setCategoryState({...categoryState, [name]: checked});
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("categoryState", categoryState);
    dispatch((updateCategory(categoryState)));
    enqueueSnackbar("Category updated", {variant: "success"});
  }

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
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />

      </Box>

    </Paper>
  );
};
