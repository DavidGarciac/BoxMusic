import { Component, OnInit, Input } from '@angular/core';
import { SearchComponent } from './search.component';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search-all',
  template: `
  <p>All...</p>
<div class="container">
    <h3>Albums</h3>
    <hr>
    <app-cards class="puntero" [items]="albums"> </app-cards>
</div>

<div class="container">
    <h3>Artists</h3>
    <hr>
    <app-cards class="puntero" [items]="artistas"> </app-cards>
</div>
  `,
  styles: []
})
export class SearchAllComponent implements OnInit {
  artistas: any[] = [];
  albums: any[] = [];
  termino: any;

  constructor(private sear: SearchComponent,
              private router: ActivatedRoute,
              private spotify: SpotifyService) {
                this.router.parent.params.subscribe( params =>{
                this.termino = params['termino'];
                })
                console.log("termino en All" +this.termino);
   }

  ngOnInit(): void {;
    //     this.albums = null;
    //     this.artistas = null;
    //     console.log("ENTRA EN ALL");
     this.buscarAlbum(this.termino);
     this.buscarArtist(this.termino);
  }

  buscarAlbum(termino: string) {
    this.spotify.getAlbums(termino).subscribe(data => {
            console.log(data);
            this.albums = data;
    });
  }
  buscarArtist(termino: string) {
    this.spotify.getArtistas(termino).subscribe(data => {
      console.log(data);
      this.artistas = data;
    });
  }

}
