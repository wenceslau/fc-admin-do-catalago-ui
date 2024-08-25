import { Genre } from "../../types/Genres";
import { Category } from "../../types/Category";


export const mapGenreToForm = (genre: Genre) => {
  return {
    id: genre.id,
    name: genre.name,
    categories_id: genre.categories?.map((category) => category.id),
  };
};

export const mapGenreFromForm = (genre: Genre, categories: Category[] | undefined) => {

  return {
    id: genre.id,
    name: genre.name,
    created_at: genre.created_at,
    updated_at: genre.updated_at,
    deleted_at: genre.deleted_at,
    is_active: genre.is_active,
    categories_id : genre.categories_id,
    categories: categories?.filter((category) => genre.categories_id?.includes(category.id)),
    pivot: genre.pivot,
  };
};
