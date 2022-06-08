import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { DetailsComponent } from './details/details.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [SlideshowBackdropComponent, DetailsComponent],
  exports: [SlideshowBackdropComponent, DetailsComponent],
  imports: [CommonModule, IonicModule, PipesModule, SwiperModule],
})
export class ComponentsModule {}
