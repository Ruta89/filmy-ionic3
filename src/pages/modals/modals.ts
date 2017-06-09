import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html',
})
export class ModalsPage {
  public form: any;
  public movies: FirebaseListObservable<any[]>;
  public movieName: any = '';
  public movieGenres: any = [];
  public movieDuration: any = '';
  public movieSummary: any = '';
  public movieActors: any = [];
  public movieYear: any = '';
  public movieRating: any = '';
  public movieId: string = '';
  public isEditable: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private afDb: AngularFireDatabase,
    private viewCtrl: ViewController
  ) {
    this.form = fb.group({
      'summary': ['', Validators.minLength(10)],
      'year': ['', Validators.maxLength(4)],
      'name': ['', Validators.required],
      'duration': ['', Validators.required],
      'rating': ['', Validators.required],
      'genres': ['', Validators.required],
      'actors': ['', Validators.required]
    });

    this.movies = this.afDb.list('/films');

    if (navParams.get('isEdited')) {

      let movie = navParams.get('movie'),
        k;

      this.movieName = movie.title;
      this.movieDuration = movie.duration;
      this.movieSummary = movie.summary;
      this.movieRating = movie.rating;
      this.movieYear = movie.year;
      this.movieId = movie.$key;

      for (k in movie.genres) {
        this.movieGenres.push(movie.genres[k].name);
      }

      for (k in movie.actors) {
        this.movieActors.push(movie.actors[k].name);
      }

      this.isEditable = true;

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalsPage');
  }

  saveMovie(val) {
    let title: string = this.form.controls["name"].value,
      summary: string = this.form.controls["summary"].value,
      rating: number = this.form.controls["rating"].value,
      genres: any = this.form.controls["genres"].value,
      actors: any = this.form.controls["actors"].value,
      duration: string = this.form.controls["duration"].value,
      year: string = this.form.controls["year"].value,
      types: any = [],
      people: any = [],
      k: any;

    for (k in genres) {
      types.push({
        "name": genres[k]
      });
    }

    for (k in actors) {
      people.push({
        "name": actors[k]
      });
    }

    if (this.isEditable) {
      this.movies.update(this.movieId, {
        title: title,
        summary: summary,
        rating: rating,
        duration: duration,
        genres: types,
        actors: people,
        year: year
      });
    } else {
      this.movies.push({
        title: title,
        summary: summary,
        rating: rating,
        duration: duration,
        genres: types,
        actors: people,
        year: year
      });
    }

    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
