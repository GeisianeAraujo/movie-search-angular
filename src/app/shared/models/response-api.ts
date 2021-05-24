import { Movie } from './movie';

export class ResponseApi {
  results: Movie[];
  page?: number;
  total_results?: number;
  total_pages?: number;
  movie_id?: number;
  status_message?: string;
  status_code: number;
}
