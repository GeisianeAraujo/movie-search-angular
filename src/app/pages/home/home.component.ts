import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/shared/models/movie';
import { ResponseApi } from 'src/app/shared/models/response-api';
import { AutoUnsubscribe } from 'src/app/core/utils/auto-unsubscribe';

export interface User {
  name: string;
}

@Component({
  selector: 'homePage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomePage extends AutoUnsubscribe implements OnInit {
  searchForm: FormGroup;
  filteredOptions$: Observable<any>;
  movies: Movie[] = [];
  isLoading: boolean = false;
  isSeeking: boolean = false;
  userImage: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _movieService: MovieService
  ) {
    super();
    this.userImage = 'assets/images/user.svg';
  }

  ngOnInit(): void {
    this.initForm();
    this.movieSearch();
    this.comicList();
  }

  initForm() {
    this.searchForm = this._formBuilder.group({
      search: [''],
    });
  }

  get form() {
    return this.searchForm.controls;
  }

  private movieSearch() {
    this.filteredOptions$ = this.searchForm.get('search')!.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(1500),
      filter((result) => {
        if (result.length === 0) {
          this.onReset();
          return false;
        }
        return result.length > 2;
      }),
      tap(() => (this.isLoading = true)),
      switchMap((value) =>
        this._movieService.searchMovie(value.toLowerCase()).pipe(
          finalize(() => {
            this.isLoading = false;
            this.isSeeking = true;
          }),
          this.unsubsribeOnDestroy
        )
      )
    );
  }

  private comicList() {
    this.isLoading = true;

    this._movieService
      .getPopularMovies()
      .pipe(
        switchMap((movies: ResponseApi) => {
          if (movies.results.length > 0) {
            return this.joinImages(movies);
          }
          return of([]);
        }),
        this.unsubsribeOnDestroy
      )
      .subscribe(
        (response: Movie[]) => {
          this.movies = response;
          this.isLoading = false;
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
        }
      );
  }

  private joinImages(movies: ResponseApi) {
    return forkJoin(
      movies.results.map((movie: Movie) => {
        return this._movieService.getImageById(movie.id).pipe(
          map((image: any) => {
            movie.image = image;
            return movie;
          })
        );
      })
    );
  }

  private onReset() {
    this.isLoading = false;
    this.isSeeking = false;
  }
}
