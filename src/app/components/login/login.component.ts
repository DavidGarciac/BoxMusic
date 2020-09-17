import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UsuarioModel = new UsuarioModel();
  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    // this.auth.isAuth().subscribe(user => {
    //   console.log("ENTRAAAAAAAAA");
    //   console.log(user);
    //     if (user) {
    //       this.router.navigateByUrl('/home');
    //     }
    //   });
  }

 loginGoogle(){
   console.log("GOOOOOGLE");
   this.auth.loginGoogle().then((res) =>{
    this.router.navigateByUrl('/home');
    }).catch(err => console.log('err', err));

  //  this.auth.isAuth().subscribe(user => {
  //   console.log("ENTRAAAAAAAAA");
  //   this.router.navigateByUrl('/home');
    
  //     if (user) {
  //       this.router.navigateByUrl('/home');
  //     }
  //   });
 }

  loginn( form: NgForm){
    if (form.invalid){ return;}

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espera por favor...',
      icon: 'info',
      });
      Swal.showLoading();

    this.auth.login( this.user )
    .subscribe(resp => {
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message)
      Swal.fire({
        allowOutsideClick: false,
        text: err.error.error.message,
        title: 'Error al autenticar',
        titleText: 'Error',
        icon: 'error',
      });
    });
  }

}
