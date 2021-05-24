import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-grid-movie',
  templateUrl: './grid-movie.component.html',
  styleUrls: ['./grid-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridMovieComponent implements OnInit {
  @Input() moviesList: Movie[];

  public baseUrlImage = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
  public indexHover: number = -1;

  constructor() {}
  ngOnInit(): void {}
}
