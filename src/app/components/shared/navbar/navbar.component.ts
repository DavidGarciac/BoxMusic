import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { SearchComponent } from '../../search/search.component';
import { SpotifyService } from '../../../services/spotify.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { HomeComponent } from '../../home/home.component';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})

export class NavbarComponent implements OnInit {
  public isLogged: boolean = false;
  public usu: any;
  constructor( private auth: AuthService,
               private router: Router,
               private spoti: SpotifyService,
               ) {this.auth.isAuth().subscribe(user => {
                if(user){
                  this.isLogged = true;
                  this.auth.getUserfirebase( localStorage.getItem('uid')).subscribe(user => {
                    this.usu = user;
                    // console.log(this.usu);
                });
                }
                else {this.isLogged = false;}
              }); }

              ngOnInit(): void {

              }

  buscar(termino: string){
    this.router.navigate(['/search',termino]);
}

  signout(){
    this.auth.logout_();
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
 
}
