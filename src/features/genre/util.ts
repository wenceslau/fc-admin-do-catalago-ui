import { Genre } from "../../types/Genres";

export const mapGenreToForm = (genre: Genre) => {
  return {
    id: genre.id,
    name: genre.name,
    categories_id: genre.categories?.map((category) => category.id),
  };
};

export const mapGenreFromForm = (genre: Genre) => {
  return {
    id: genre.id,
    name: genre.name,
    created_at: genre.created_at,
    updated_at: genre.updated_at,
    deleted_at: genre.deleted_at,
    is_active: genre.is_active,
    categories: genre.categories,
    categories_id: genre.categories?.map((category) => category.id),
    pivot: genre.pivot,
  };
};
