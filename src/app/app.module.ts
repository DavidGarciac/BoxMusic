import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//IMPORTS
import { RatingModule } from 'ng-starrating';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import {APP_ROUTING} from './app.routes';
//PIPES
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CardsComponent } from './components/shared/cards/cards.component';


// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Services
import { SpotifyService } from './services/spotify.service';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SearchComponent } from './components/search/search.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { SearchAlbumsComponent } from './components/search/search-albums.component';
import { SearchArtistsComponent } from './components/search/search-artists.component';
import { SearchAllComponent } from './components/search/search-all.component';
import { SearchalbumComponent } from './components/searchalbum/searchalbum.component';
import { SearchartistComponent } from './components/searchartist/searchartist.component';
import { StarReviewComponent } from './components/star-review/star-review.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgDropFilesDirective } from './driectives/ng-drop-files.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoimagePipe,
    DomseguroPipe,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CardsComponent,
    AlbumsComponent,
    ArtistComponent,
    SearchComponent,
    LoadingComponent,
    SearchAlbumsComponent,
    SearchArtistsComponent,
    SearchAllComponent,
    SearchalbumComponent,
    SearchartistComponent,
    StarReviewComponent,
    ProfileComponent,
    NgDropFilesDirective,

  ],
  imports: [
    BrowserModule, 
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    RatingModule ,
    APP_ROUTING
  ],
  providers: [
    SpotifyService,AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
