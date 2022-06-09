import { IonicModule } from '@ionic/angular';
import { NgModule, PACKAGE_ROOT_URL } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    SwiperModule,
    PipesModule,
    ReactiveFormsModule
  ],
  providers: [ReactiveFormsModule],
  declarations: [Tab1Page],
})
export class Tab1PageModule {}
