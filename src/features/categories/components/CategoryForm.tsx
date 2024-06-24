import React from "react";
import {Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {Category} from "../categorySlice";

type Props = {
  category?: Category;
  isDisabled?: boolean;
  onLoading?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFieldSetElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


export function CategoryForm({
                               category,
                               isDisabled,
                               onLoading,
                               onSubmit,
                               handleChange,
                               handleToggle,
                             }: Props) {
  return (
    <Box p={2} gap={2}>
      <form>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                label="Name"
                value={category?.name}
                disabled={isDisabled}
                onChange={handleChange}
              ></TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                label="Description"
                value={category?.description}
                disabled={isDisabled}
                onChange={handleToggle}
              ></TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={category?.is_active}
                    onChange={handleChange}
                    name="is_active"
                    color="secondary"
                    inputProps={{"aria-label": "controlled"}}
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
                disabled={isDisabled}
              >
                Save
              </Button>

            </Box>
          </Grid>
        </Grid>

      </form>
    </Box>
  );
}
