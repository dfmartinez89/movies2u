// Generated by https://quicktype.io

export interface GetAllMovies {
  success: boolean;
  count: number;
  data: Movie[];
}

export interface Movie {
  geoLocation: GeoLocation;
  _id: string;
  title: string;
  year: number;
  genre: string;
  poster: string;
  rating: number;
  createdAt: string;
  reviews: Review[];
}

export interface GeoLocation {
  type: string;
  coordinates: number[];
  formattedLocation: string;
}

export interface Review {
  reviewGeoLocation: GeoLocation;
  author: string;
  rating: number;
  description: string;
  _id: string;
  createdAt: string;
}

// Generated by https://quicktype.io

export interface GetMovieDetails {
  success: boolean;
  data: Movie;
}
