import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() movies: Movie[] = [];
  swiperOpts = {
    slidesPerView: 1.2,
    freeMode: true,
    spaceBetween: -10,
  };
  noImage = 'assets/img/no-image.jpg';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async getDetails(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetailsComponent,
      componentProps: { id },
    });
    modal.present();
  }
}
