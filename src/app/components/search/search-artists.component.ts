import { Component, OnInit } from '@angular/core';
import { SearchComponent } from './search.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-artists',
  template: `
    <p>Artistsss</p>
    <div class="container">
    <h3>Artists</h3>
    <hr>
    <app-cards class="puntero" [items]="artistas"> </app-cards>
</div>
  `,
  styles: []
})
export class SearchArtistsComponent implements OnInit {

  artistas: any[] = [];
  termino: any;
  constructor(private search: SearchComponent,
              private router: ActivatedRoute) {
    this.router.parent.params.subscribe( params =>{
     this.termino = params['termino'];
    })
    console.log("termino en Artist" +this.termino);
  }

  ngOnInit(): void {
   console.log("entra");
  //  this.search.buscarArtist(this.termino);
  // this.artistas = this.search.artistas;
  }
}
