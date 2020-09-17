import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent implements OnInit {

  artista: any = {};
  topTracks: any = {};
  Albums: any = {};
  Singles: any = {};
  constructor(private router: ActivatedRoute, private spotify: SpotifyService, private nav: Router) {
    this.router.params.subscribe( params =>{ 
    this.getAlbums( params['id']);
    this.getSingles( params['id']);
    this.getArtista( params['id']);
    this.getTopTracks( params['id']);
  });
  }

  ngOnInit(): void {
  }

  
  verCard( item: any) {
    let artistaId; let idAlbum;
    if ( item.type === 'artist'){
      artistaId = item.id;
      this.nav.navigate(['artist/', artistaId]);
    } else {
      console.log(item.id);
      artistaId = item.artists[0].id;
      idAlbum = item.id;
      this.nav.navigate(['albums/',idAlbum]);
    }
  }

  getArtista( id: string ){
    this.spotify.getArtista (id)
      .subscribe( artista => {
        console.log(artista);
        this.artista = artista;
      })
}

getTopTracks(id: string){
  this.spotify.getTopTracks(id)
   .subscribe( topTracks =>{
    console.log("TOP TRACKS");
    console.log(topTracks);
    this.topTracks = topTracks;
   });
}

getAlbums(id: string){
  this.spotify.getAlbumsArtista(id)
   .subscribe( Albums =>{
    console.log("ALBUMS DEL ARTISTA:");
    console.log(Albums);
    this.Albums = Albums;
   });
}

getSingles(id: string){
  this.spotify.getSinglesArtista(id)
   .subscribe( data =>{
    console.log("ALBUMS DEL ARTISTA:");
    console.log(data);
    this.Singles = data;
   });
}

}
