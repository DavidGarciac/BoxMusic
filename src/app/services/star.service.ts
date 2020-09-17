import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';

export interface Star {
  userId: any;
  albumId: any;
  value: number;
  date: any;
}
export interface Star2 {
  userId: any;
  albumId: any;
  value: number;
  coment: any;
  date: any;
}

 
 
@Injectable({
  providedIn: 'root'
})
export class StarService {
  fecha: Date =  new Date();

  constructor(private afs: AngularFirestore) { }

  // devuelve el rating de ese User sobre ese Album
  getUserAlbumStarr(userId,albumId){
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId).where('albumId', '==', albumId));
    return starsRef.valueChanges();
  }
  getRecentStars(userId){
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId).orderBy("date","desc").limit(5));
    return starsRef.valueChanges();
  }
// devuelve el rating sobre ese Album
  getAllStarAlbum(albumId){
    const starsRef = this.afs.collection('stars', ref => ref.where('albumId', '==', albumId));
    return starsRef.valueChanges();
  }

  getComentUsers(){

  }

  //Añadir rating de star de un album
  setStar(userId, albumId, value){
    var date =  new Date();
    const star: Star = {userId, albumId, value,date};
    const starPath = `stars/${star.userId}_${star.albumId}`;
     this.afs.doc(starPath).set(star);
  }
//Review  a un album
setReview(userId, albumId, value, coment){
  var date =  new Date();
  const star: Star2 = {userId, albumId, value, date,coment};
  const starPath = `stars/${star.userId}_${star.albumId}`;
   this.afs.doc(starPath).set(star);
}
  
}
