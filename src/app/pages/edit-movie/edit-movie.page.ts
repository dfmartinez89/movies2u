import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';
import { Geolocation } from '@capacitor/geolocation';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Movie } from 'src/app/interfaces';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
})
export class EditMoviePage implements OnInit {
  @Input() id;
  movie: Movie;
  movieForm: UntypedFormGroup;

  public errorMessages = {
    location: [
      { type: 'required', message: 'Location is required' },
      {
        type: 'minlength',
        message: 'Location must be at least 5 characters long',
      },
      {
        type: 'maxlength',
        message: 'Location cannot be more than 100 characters long',
      },
    ],
    title: [
      { type: 'required', message: 'Title is required' },
      {
        type: 'minlength',
        message: 'Title must be at least 3 characters long',
      },
      {
        type: 'maxlength',
        message: 'Title cannot be more than 200 characters long',
      },
    ],
    rating: [
      { type: 'required', message: 'Rating is required' },
      { type: 'min', message: 'Rating must be at least 1' },
    ],
    genre: [
      { type: 'required', message: 'Genre is required' },
      {
        type: 'minlength',
        message: 'Description must be at least 4 characters long',
      },
      {
        type: 'maxlength',
        message: 'Genre cannot be more than 100 characters long',
      },
    ],
    year: [{ type: 'required', message: 'Year is required' }],
    poster: [{ type: 'required', message: 'Poster is required' }],
  };
  /**
   * Native props
   */
  latitude: number;
  longitude: number;
  accuracy: number;
  photo: SafeResourceUrl;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private moviesService: MoviesService,
    private sanitizer: DomSanitizer,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.moviesService.getMovieDetails(this.id).subscribe((resp) => {
      this.movie = resp.data;
    });
    this.photo = '../../../assets/avatars/av-4.png';

    this.movieForm = this.formBuilder.group({
      location: new UntypedFormControl(
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.required,
        ])
      ),
      rating: new UntypedFormControl(
        '',
        Validators.compose([Validators.pattern('[1-5]'), Validators.required])
      ),
      title: new UntypedFormControl(
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(200),
          Validators.required,
        ])
      ),
      genre: new UntypedFormControl(
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(100),
          Validators.required,
        ])
      ),
      year: new UntypedFormControl(
        '',
        Validators.compose([Validators.required])
      ),
      poster: new UntypedFormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  /**
   * submit the movie
   */
  async submit(value) {
    await (
      await this.moviesService.addMovie(value)
    ).subscribe(() => {
      this.navCtrl.navigateRoot('/main/tabs/tab1');
    });
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.accuracy = position.coords.accuracy;
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.webPath
    );
  }

  back() {
    this.modalCtrl.dismiss();
  }
}
