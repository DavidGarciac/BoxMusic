import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  constructor( private http: HttpClient) {
    // this.getToken();
    this.obtenerToken();
    console.log('spoti listo');
    // const express = require('express');
    // const request = require('request');
    // const path = require('path');
    // const appp = express();
  }
  clientid: '3bff61ab6dc846b89fced913eeab7010';
  clientsecret: '3a07ce82828b462493931ad57f278d2b';
   tooken: any;

   obtenerToken(){
    const clientId=`3bff61ab6dc846b89fced913eeab7010`;
    const clientSecret=`3a07ce82828b462493931ad57f278d2b`;
    const urrl=`https://spotiapp-backend.herokuapp.com/spotify/${clientId}/${clientSecret}`;
    this.http.get(urrl).subscribe( (data: any) => {
       console.log(data);
       this.tooken = data.access_token;
     });
  }
   getQuery( query: string){
     const url = `https://api.spotify.com/v1/${ query }`;
     const headers = new HttpHeaders ({
       'Authorization': `Bearer ${this.tooken}`
     });
     return this.http.get(url, { headers});
   }

   getNewReleases() {
      return this.getQuery('browse/new-releases?limit=48')
         .pipe( map( data => data['albums'].items));

  }
   // Buscador de Artistas
  getArtistas(termino: string){
     return this.getQuery(`search?q=${termino}&type=artist&limit=10`)
     .pipe( map( data =>  data['artists'].items));
   }
   // Buscador de albums
   getAlbums(termino: string){
     return this.getQuery(`search?q=${termino}&type=album`).pipe( map( data => data['albums'].items));
   }
 // Buscador de albumstracks
   getAlbumTracks(id: string){
     return this.getQuery(`albums?ids=${id}`).pipe( map( data => data['albums']));
   }
    // Buscador de albums
   getArtista( id: string){
     return this.getQuery(`artists/${ id }`);
   }

   // Las Top Tracks de Un Artista
   getTopTracks( id: string){
     return this.getQuery(`artists/${id}/top-tracks?country=us`);
   }

  // Todos los albums de un Artista
   getAlbumsArtista( id: string){
     return this.getQuery(`artists/${id}/albums?include_groups=album&market=us`);
   }
   getSinglesArtista( id: string){
     return this.getQuery(`artists/${id}/albums?include_groups=single&market=us`);
   }



}


