import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie';

@Component({
  selector: 'app-grid-skeleton',
  templateUrl: './grid-skeleton.component.html',
  styleUrls: ['./grid-skeleton.component.scss'],
})
export class GridSkeletonComponent implements OnInit {
  items = [1];
  constructor() {
    this.items = Array(10).fill(this.items);
  }
  ngOnInit(): void {}
}
