import { Component, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { SearchAllComponent } from './search-all.component';
import { SearchAlbumsComponent } from './search-albums.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
 
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  albums: any[] = [];
  loading: boolean;
  termino: any;
  search: boolean;
 
  constructor(private spotify: SpotifyService,
              private activatedRoute: ActivatedRoute,
              ) {
                this.loading = true;
                this.search = true;
               }

  ngOnInit(){
  this.activatedRoute.params.subscribe(params => {
    this.spotify.getAlbums(params['termino']).subscribe(data => {
    this.albums = data;});
    this.spotify.getArtistas(params['termino']).subscribe(data => {
    this.artistas = data;});
    this.termino = params['termino'];
  })
  this.loading = false;
  }

  ocultar(){
    this.search = false;

  }



}
