import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchalbum',
  templateUrl: './searchalbum.component.html'
})
export class SearchalbumComponent implements OnInit {

  albums: any[] = [];
  loading: boolean;
  termino: any;
  search: boolean;
  constructor(private spotify: SpotifyService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // console.log("PARAMETROS: " + JSON.stringify(params))
      this.spotify.getAlbums(params['termino']).subscribe(data => {
        // console.log(data);
        this.albums = data;
});
      this.termino = params['termino'];
    })
  }

}
