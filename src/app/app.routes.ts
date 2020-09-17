import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SearchComponent } from './components/search/search.component';
import { SearchalbumComponent } from './components/searchalbum/searchalbum.component';
import { SearchartistComponent } from './components/searchartist/searchartist.component';
import { ProfileComponent } from './components/profile/profile.component';



const APP_ROUTES: Routes = [
    {path: 'home' , component: HomeComponent, canActivate: [ AuthGuard]},
    {path: 'profile' , component: ProfileComponent, canActivate: [ AuthGuard]},
    { path: 'login'   , component: LoginComponent },
    { path: 'register'   , component: RegisterComponent },
    { path: 'albums/:id', component: AlbumsComponent},
    {path: 'artist/:id', component: ArtistComponent},
    {path: 'search/:termino', component: SearchComponent,canActivate: [ AuthGuard],
    },

    {path:'searchalbums/:termino', component: SearchalbumComponent},
    {path:'searchartists/:termino', component: SearchartistComponent},



    // {path: ' ', pathMatch: 'full', redirectTo: 'home'},
     {path: '**', redirectTo: 'login'}
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
export class AppRoutingModule { }
