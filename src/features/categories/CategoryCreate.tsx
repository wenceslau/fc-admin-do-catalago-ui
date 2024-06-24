import {Box, Paper, Typography} from "@mui/material";
import {useState} from "react";
import {Category} from "./categorySlice";
import {CategoryForm} from "./components/CategoryForm";


export const CategoryCreate = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    is_active: true,
    created_at: "",
    updated_at: "",
    deleted_at: null,
    description: null,
  });

  const handleChange = () => {
  };
  const handleTogle = () => {
  };

  return (
    <Paper>

      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h4">
            Create Category
          </Typography>
        </Box>

        <CategoryForm
          category={category}
          isDisabled={isDisabled}
          onSubmit={handleChange}
          handleChange={handleChange}
          handleToggle={handleTogle}
        />
      </Box>

    </Paper>
  );
};
