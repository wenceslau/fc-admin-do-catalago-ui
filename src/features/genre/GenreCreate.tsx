import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Genre } from "../../types/Genres";
import {
  initialState as genreInitialState,
  useCreateGenreMutation,
} from "./genreSlice";
import { mapGenreToForm } from "./util";
import {GenreForm} from "./components/GenreForm";
import {useGetCategoriesQuery} from "../categories/categorySlice";

export const GenreCreate = () => {
  const [options] = useState({
    page: 0,
    search: "",
    perPage: 1000
  });
  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useGetCategoriesQuery(options);
  const [createGenre, status] = useCreateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(genreInitialState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createGenre(mapGenreToForm(genreState));
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre created", { variant: "success" });
    }
    if (status.isError) {
      enqueueSnackbar("Genre not created", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={genreState}
          categories={categories?.items}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
