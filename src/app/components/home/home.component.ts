import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  nuevasCanciones: any[] = [];
  currentusu: any;
  constructor(private spotify: SpotifyService, private router: Router, private auth: AuthService) {
    this.spotify.getNewReleases().subscribe( (data: any) => {
    this.nuevasCanciones = data;
    }, (ServiceError) => {
       console.log( ' ERROR DE SERVICICE SPOTIFY ' + JSON.stringify(ServiceError));
    });

  }

  ngOnInit(): void {
    this.auth.getUserfirebase( localStorage.getItem('uid')).subscribe(user => {
    this.currentusu = user;
  });
  }

  UsuCurrent(){
    return this.currentusu;
  }

  verAlbum( item: any){
    let idAlbum;
    idAlbum = item.id;
    this.router.navigate(['albums', idAlbum]);
    }
}
