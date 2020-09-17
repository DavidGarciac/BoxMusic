import { Component, OnInit } from '@angular/core';
import { SearchAllComponent } from './search-all.component';
import { SearchComponent } from './search.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-albums',
  template: `
  <p>Albummsss</p>
    <div class="container">
    <h3>Albums</h3>
    <hr>
    <app-cards class="puntero" [items]="albums"> </app-cards>
   </div>
  `,
  styles: []
})
export class SearchAlbumsComponent implements OnInit {
  albums: any[] = [];
  termino: any;
  loading: boolean;
  constructor(
              private router: ActivatedRoute) {
                this.loading = true;
                this.router.parent.params.subscribe( params =>{
                this.termino= params['termino'];
            }) 
            console.log("termino en ALabum" +this.termino);}

  ngOnInit(): void {
    // this.search.buscarAlbum(this.termino);
    // this.albums = this.search.albums;
    //this.loading = false;
  }

}
