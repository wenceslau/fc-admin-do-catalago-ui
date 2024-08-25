import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Genre } from "../../types/Genres";
import {
  initialState as genreInitialState,
  useGetGenreQuery,
  useUpdateGenreMutation,
} from "./genreSlice";
import {mapGenreFromForm, mapGenreToForm} from "./util";
import {GenreForm} from "./components/GenreForm";
import {useGetCategoriesQuery} from "../categories/categorySlice";

export const GenreEdit = () => {
  const [options] = useState({
    page: 0,
    search: "",
    perPage: 1000
  });
  const { data: categories } = useGetCategoriesQuery(options);

  const id = useParams<{ id: string }>().id as string;
  const { data: genre, isFetching } = useGetGenreQuery({ id });
  const { enqueueSnackbar } = useSnackbar();
  const [updateGenre, status] = useUpdateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(genreInitialState);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setGenreState((state) => ({ ...state, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateGenre(mapGenreToForm(genreState));
  }

  useEffect(() => {
    if (genre) {
      setGenreState(mapGenreFromForm(genre));
    }
  }, [genre]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Genre updated", { variant: "success" });
    }

    if (status.isError) {
      enqueueSnackbar("Error updating genre", { variant: "error" });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={genreState}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          categories={categories?.items}
          isDisabled={isFetching || status.isLoading}
          isLoading={status.isLoading || isFetching}
        />
      </Paper>
    </Box>
  );
};
