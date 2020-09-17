import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchartist',
  templateUrl: './searchartist.component.html'
})
export class SearchartistComponent implements OnInit {

  artistas: any[] = [];
  loading: boolean;
  termino: any;
  search: boolean;
  constructor(private spotify: SpotifyService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // console.log("PARAMETROS: " + JSON.stringify(params))
      this.spotify.getArtistas(params['termino']).subscribe(data => {
        // console.log(data);
        this.artistas = data;
});
      this.termino = params['termino'];
    })
  }

}
