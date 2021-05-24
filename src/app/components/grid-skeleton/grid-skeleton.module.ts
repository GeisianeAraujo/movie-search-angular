import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridSkeletonComponent } from './grid-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [GridSkeletonComponent],
  exports: [GridSkeletonComponent],
  imports: [CommonModule, FlexLayoutModule, NgxSkeletonLoaderModule],
})
export class GridSkeletonComponentModule {}
