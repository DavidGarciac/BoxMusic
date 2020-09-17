import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

import * as firebase from 'firebase';
import { FileItem } from '../models/file-item.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;
  uidToken: string;
  public isLogged: boolean = false;
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  // Clave proyecto FIREBASE
  private apikey = 'AIzaSyCBqUly4UA91mi2Cey1jhhN2eZagTohxnQ';

  private curl = 'https://letterboxmusic-79a52.firebaseio.com';

  private CARPETA_IMAGENES = 'img';


  // CREAR NUEVOS USERS
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // private currentUserSubject: BehaviorSubject<UsuarioModel>;
  // public currentUser: Observable<UsuarioModel>;
  public usucurrent: any;

  user$: Observable<any>;
 

  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private http: HttpClient) {
                this.leerToken();
                this.getCurrentUserio();
                // this.currentUserSubject = new BehaviorSubject<UsuarioModel>(JSON.parse(localStorage.getItem('currentUser')));
                // this.currentUser = this.currentUserSubject.asObservable();
                this.usersCollection = this.afs.collection<UserModel>('Users');
                
                this.users = this.usersCollection.valueChanges();
                //this.observador();
                
  }
  private usersCollection: AngularFirestoreCollection<UserModel>;
  private users: Observable<UserModel[]>;
  userDoc: any;

  saveimg( imagenes: FileItem[]){
      const storageRef = firebase.storage().ref();
      for ( const item of imagenes ) {
        const uploadTask: firebase.storage.UploadTask =
                    storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                              .put( item.archivo );
        uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ( snapshot: firebase.storage.UploadTaskSnapshot ) =>
          item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
                ( error ) => console.error('Error al subir', error ),
                () => {
                  console.log('Imagen cargada correctamente nombre' + item.nombreArchivo);

                  uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    const imageUrl = downloadURL;
                    console.log('URL:' + imageUrl);
                    this.guardarImage({
                      nombre: item.nombreArchivo,
                      url: imageUrl 
                    });
                  });
                  });
      }

  }

  guardarImage(image: {nombre: string, url: string}){
    const starsRef =  this.afs.collection('Users').doc(this.usucurrent.uid).update({ nombre: 'jack', photo: image.url });

  }

  getallusers(){
    return this.users;
  }

  // getusercurrent(){
  //   this.userDoc = this.afs.collection<UserModel>('Users', ref => ref.where('UID', '==', uid));
  // }

   getCurrentUserio() {
   return this.isAuth().subscribe(user =>{
      if(user){
        this.usucurrent = user;
      }
    });
  }


  getUserfirebase(uid){
    const starsRef = this.afs.collection('Users', ref => ref.where('uid', '==', uid));
    return starsRef.valueChanges();
  }


  login( usuario: UsuarioModel){
    const authData  = {
      ...usuario,
      returnSecureToken: true
    };
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password);
    return this.http.post(
         `${ this.url }:signInWithPassword?key=${ this.apikey }`,
         authData
       ).pipe(
         map( resp => {
           this.guardarToken( resp['idToken'], resp['localId']);
           return resp;
         })
       );
  }

  loginGoogle() {
    this.isAuth().subscribe( (data: any) => {
      console.log(data);
    });
    return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()).then((res) =>{
      console.log(res);
      this.guardarToken( res['idToken'], res['localId']);
    
      return res;
      }).catch(err => console.log('err', err));;
    
}

  newUser(usuario: UsuarioModel){
    const authData  = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }:signUp?key=${ this.apikey }`,
      authData
     ).pipe(
       map( resp => {
         this.guardarToken( resp['idToken'],resp['localId']);
         console.log("Respuesta "+ JSON.stringify(resp));
         usuario.uid = resp['localId'];
         this.PostUser(usuario);
         return resp;
       })
    );
  }

  PostUser(usuario: UsuarioModel){
    return this.afs.collection('Users').doc(this.usucurrent.uid).update({ usuario });
  }


  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }
  async SignOut(){
   await this.afAuth.auth.signOut();
   return this.router.navigateByUrl('/login');

  }
 

  updateUserData(user) {
    //const userRef: AngularFirestoreDocument<User> = this.db.collection('Users').doc(user.uid)
    console.log("Usuario" +  JSON.stringify(user));
      return this.afs.collection('Users').doc(this.usucurrent.uid).update({
      nombre: user.nombre,
      email: user.email,
    
 });
  }

  logout_() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
  }

  private guardarToken( idToken: string, localId: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    localStorage.setItem('uid', localId);
    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expira', hoy.getTime().toString());
  }
  leerToken(){
    if ( localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = ' ';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean{
   if ( this.userToken.length < 2){
     return false;
   }
   const expira = Number(localStorage.getItem('expira'));
   const expiraDate = new Date();
   expiraDate.setTime(expira);
   if (expiraDate > new Date()){
    return true;
  } else{
    return false;
  }
  }

  estaokk(): boolean {
    console.log("USERTOKEN"+ this.userToken.length );

    if ( this.userToken.length < 2){
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if (expiraDate > new Date()){
     return true;
   } else{
     return false;
   }
   
  }

  isAuth(){
    //return this.user$;
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  observador(){
    this.afAuth.auth.onAuthStateChanged(function(user) {

      if (user) {
        // this.guardarToken( user['idToken'], user['localId']);
        console.log("USEEEEEER OBSERVADOR: " + JSON.stringify(user));
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

      } else {
        console.log("NO HAY USUARIO");
      }
    });
  }

  getCurrentUser(){
    this.isAuth().subscribe(auth => {
       if(auth){
        this.isLogged = true;
       } else{
        this.isLogged = false;
       }

      })
}




}
