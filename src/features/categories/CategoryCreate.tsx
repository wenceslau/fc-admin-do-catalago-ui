import {Box, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import {Category, createCategory} from "./categorySlice";
import {CategoryForm} from "./components/CategoryForm";
import {useAppDispatch} from "../../app/hooks";


export const CategoryCreate = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>({
    id: Math.floor(Math.random() * 1000).toString(),
    name: "",
    is_active: true,
    created_at: "",
    updated_at: "",
    deleted_at: null,
    description: null,
  });
  const dispatch = useAppDispatch();

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
    console.log("category", categoryState);
    dispatch((createCategory(categoryState)));
  }

  return (
    <Paper>

      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h4">
            Create Category
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
