import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent  implements OnInit{

  @Input() items: any[] = [];
  @Input() itemslenght: number;
  items2: any[] = [];
  bucle: number[] = [0, 1, 2, 3, 4];
  collections: any[] = [ ];
  p: number = 1;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items2 = this.items
    // console.log ("Block  titemslenght" + this.itemslenght );
    this.Paginador();
  }

  ngOnChanges(): void {
    this.Paginador();
  }

  verCard( item: any) {
    let artistaId; let idAlbum;
    if ( item.type === 'artist'){
      artistaId = item.id;
      this.router.navigate(['artist/', artistaId]);
    } else {
      // console.log(item.id);
      artistaId = item.artists[0].id;
      idAlbum = item.id;
      this.router.navigate(['albums/',idAlbum]);
    }
  }

  Paginador(){
    let col: any[] =[];
    var paginas = Math.ceil(this.itemslenght / 12);
    // console.log ("PAGINADOR" + this.items  + paginas);
    for (let i = 0; i < paginas; i++) {
      var a=1;
      var pag: any[] = [0, 12, 24, 36, 48, 60, 72, 84, 96 ];
      this.collections[i]= pag[i];
      // console.log ("Block statement execution no." + i);
    }
  }


}
