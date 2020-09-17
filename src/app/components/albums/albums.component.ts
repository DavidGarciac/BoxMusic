import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { StarService } from '../../services/star.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
})
export class AlbumsComponent implements OnInit {

  canciones: any = {};
  album: any = {};
  usu: any = {};
  // albumDoc: AngularFirestoreDocument<any>;
  dur = {min: 0, sec: 0}
  // Album: Observable<any>;
  // value: any; //RATING DE ESTRELLAS A UN ALBUM
  public coments = []; //COMENTS DEL ALBUM
  bucle: number[] = [0, 1, 2, 3, 4];
  p: number = 1;
  collection: any[] = ['Apple', 'Orange', 'Banana'];
  constructor( private spotify: SpotifyService, private starService: StarService, private auth: AuthService, private rout: Router, private router: ActivatedRoute, private afs: AngularFirestore) {
  }
  ngOnInit(): void {
    this.router.params.subscribe( params => {
      this.getTracks(params['id']);
    });
    this.auth.getUserfirebase( localStorage.getItem('uid')).subscribe(user => {
    this.usu = user;
});
  }

  ngAfterViewInit(){
    this.getDuration();
  }

  getTracks(id: string){
    // this.loading = true;
    this.spotify.getAlbumTracks(id)
    .subscribe( data => {
      this.album = data;
      this.canciones = data[0].tracks.items;
      console.log(this.canciones);
      this.starService.getAllStarAlbum(this.album[0].name).subscribe(res =>{
        console.log("RESPUESTA "+ res);
        this.coments = res;
        var outerHtmlElement: any = res;
       });
    })
  }

  getDuration(){
    let duracion: number = 5555;
    this.canciones.forEach( (myObject, index) => {
      duracion =  duracion + myObject.duration_ms;
    });
    let min = Math.floor((duracion / 1000 / 60) << 0), sec = Math.floor((duracion / 1000) % 60);
    this.dur.min = min;
    this.dur.sec = sec;
  }




}
