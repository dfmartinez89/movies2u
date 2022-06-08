import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PairPipe } from './pair.pipe';

@NgModule({
  declarations: [PairPipe],
  exports: [PairPipe],
  imports: [CommonModule],
})
export class PipesModule {}
