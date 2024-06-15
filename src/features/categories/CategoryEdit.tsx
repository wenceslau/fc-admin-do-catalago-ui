import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import {useAppSelector} from '../../app/hooks';
import {selectCategoryById} from './categorySlice';
import {useState} from 'react';

export const CategoryEdit = () => {

  const id = useParams().id || '';
  const [isDisabled, setIsDisabled] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id));

  const handleChange = () => {
  };
  const handleTogle = () => {
  };

  return (
    <Paper>

      <Box p={2}>
        <Box mb={2}>
          <Typography variant="h4">
            Edit Category
          </Typography>
        </Box>
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
                    onChange={handleTogle}
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
                        inputProps={{'aria-label': 'controlled'}}
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
      </Box>

    </Paper>
  );
};
