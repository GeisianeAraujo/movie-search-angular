import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridMovieComponent } from 'src/app/components/grid-movie/grid-movie.component';

@NgModule({
  declarations: [GridMovieComponent],
  exports: [GridMovieComponent],
  imports: [CommonModule, FlexLayoutModule],
})
export class GridMovieComponentModule {}
