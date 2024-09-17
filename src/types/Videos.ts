import { Category } from "./Category";
import {Genre} from "./Genres";
import {CastMember} from "./CastMembers";

export interface Videos {
  current_page: number;
  per_page: number;
  total: number;
  items: Video[];
}

export interface Video {
  id: string;
  name: string;
  description: string;
  opened: boolean;
  rating: string;
  duration: string;
  deleted_at?: null;
  created_at: string;
  updated_at: string;
  categories?: Category[];
  genres?: Genre[];
  cast_members?: CastMember[];
  thumb_file_url: string;
  banner_file_url: string;
  trailer_file_url: string;
  video_file_url: string;
}

export interface GenreParams {
  page?: number;
  perPage?: number;
  search?: string;
  sort?: string;
  direction?: string;
}
