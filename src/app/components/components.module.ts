import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [SlideshowBackdropComponent, DetailsComponent],
  exports: [SlideshowBackdropComponent, DetailsComponent],
  imports: [CommonModule, IonicModule, PipesModule],
})
export class ComponentsModule {}
