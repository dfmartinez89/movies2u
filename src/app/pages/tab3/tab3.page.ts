import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  movieForm: UntypedFormGroup;

  public errorMessages = {
    geoLocation: [
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

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private moviesService: MoviesService
  ) {}
  ngOnInit() {
    this.movieForm = this.formBuilder.group({
      geoLocation: new UntypedFormControl(
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
  submit(value) {
    this.moviesService.addMovie(value).subscribe(() => {
      this.modalCtrl.dismiss();
    });
  }
}
