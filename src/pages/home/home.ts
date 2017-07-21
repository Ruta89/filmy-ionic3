import { Component } from '@angular/core';
import { NavController, ModalController, Platform, IonicPage } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
//import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public movies: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
    private afDb: AngularFireDatabase,
    private modalCtrl: ModalController,
    private platform: Platform) {

  }

  ionViewDidLoad() {
    this.platform.ready()
      .then(() => {
        this.movies = this.afDb.list('/films');
      });
  }

  addRecord() {
    let modal = this.modalCtrl.create('ModalsPage');
    modal.present();
  }

  editMovie(movie) {
    let params = { movie: movie, isEdited: true },
      modal = this.modalCtrl.create('ModalsPage', params);
    modal.present();
  }

  deleteMovie(movie: any) {
    this.movies.remove(movie);
  }

}
