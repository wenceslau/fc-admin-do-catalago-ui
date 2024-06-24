import {Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField,} from "@mui/material";

import {Link} from "react-router-dom";
import {Category} from "../categorySlice";

type Props = {
  category: Category;
  isDisabled?: boolean;
  isLoading?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CategoryForm(
  {
    category,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
    handleToggle,
  }: Props) {

  console.log(JSON.stringify(category));

  return (
    <Box p={2} gap={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                label="Name"
                name="name"
                value={category?.name}
                defaultValue=" "
                disabled={isDisabled}
                onChange={handleChange}>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                label="Description"
                name="description"
                value={category?.description || null}
                disabled={isDisabled}
                onChange={handleChange}>
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    name="is_active"
                    color="secondary"
                    inputProps={{"aria-label": "controlled"}}
                    checked={category?.is_active || false}
                    disabled={isDisabled}
                    onChange={handleToggle}
                  />
                }
                label="Active"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2}>
              <Button variant="contained" component={Link} to="/categories">
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isDisabled}>
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>

      </form>
    </Box>
  );
}
