import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {
  @Input() id;
  reviewForm: FormGroup;

  public errorMessages = {
    reviewLocation: [
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
    author: [
      { type: 'required', message: 'Author is required' },
      {
        type: 'minlength',
        message: 'Author must be at least 3 characters long',
      },
      {
        type: 'maxlength',
        message: 'Author cannot be more than 30 characters long',
      },
    ],
    rating: [
      { type: 'required', message: 'Rating is required' },
      { type: 'min', message: 'Rating must be at least 1' },
    ],
    description: [
      { type: 'required', message: 'Description is required' },
      {
        type: 'minlength',
        message: 'Description must be at least 4 characters long',
      },
      {
        type: 'maxlength',
        message: 'Description cannot be more than 200 characters long',
      },
    ],
  };

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      author: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required,
        ])
      ),
      rating: new FormControl(
        '',
        Validators.compose([Validators.pattern('[1-5]'), Validators.required])
      ),
      description: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(200),
          Validators.required,
        ])
      ),
      reviewLocation: new FormControl(
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(100),
          Validators.required,
        ])
      ),
    });
  }

  back() {
    this.modalCtrl.dismiss();
  }

  /**
   * submit the review
   */
  submit(value) {
    this.moviesService.addReview(this.id, value).subscribe(() => {
      this.modalCtrl.dismiss();
    });
  }
}
