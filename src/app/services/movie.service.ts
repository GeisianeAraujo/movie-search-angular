import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseApi } from '../shared/models/response-api';
import { Movie } from '../shared/models/movie';
import { HandleObservableService } from '../core/utils/handle-observable-service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends HandleObservableService {
  private _baseUrlApi = 'https://api.themoviedb.org/3';
  private _apiKey = '0878f33a15c66b74f481f89b605f088b';
  language: string = 'pt-BR';

  constructor(private _httpClient: HttpClient) {
    super();
  }

  public getPopularMovies(page: number = 1): Observable<ResponseApi> {
    const endpointUrl = `${this._baseUrlApi}/movie/popular?api_key=${this._apiKey}&language=${this.language}&page=${page}`;
    return this._httpClient
      .get<ResponseApi>(endpointUrl)
      .pipe(
        retry(2),
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public getImageById(movie_id: number): Observable<ResponseApi> {
    const endpointUrl = `${this._baseUrlApi}/movie/${movie_id}/images?api_key=${this._apiKey}`;
    return this._httpClient.get<ResponseApi>(endpointUrl).pipe(
      retry(2),
      map((data) => data),
      catchError(this.handleError)
    );
  }

  public searchMovie(
    search: string = 'marvel',
    page: number = 1
  ): Observable<Movie[]> {
    const endpointUrl = `${this._baseUrlApi}/search/movie?api_key=${this._apiKey}&language=${this.language}&query=${search}&page=${page}`;
    return this._httpClient.get<ResponseApi>(endpointUrl).pipe(
      retry(2),
      map((response: ResponseApi) => {
        return response.results.filter((item) => item.poster_path !== null);
      }),
      catchError(this.handleError)
    );
  }
}
