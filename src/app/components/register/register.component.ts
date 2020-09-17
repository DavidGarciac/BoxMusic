import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { auth } from 'firebase/app';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: UsuarioModel;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = new UsuarioModel();
   // this.user.email = ' ';
  }

  onSubmit( form: NgForm) {
    // console.log(form);
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espera por favor...',
      icon: 'info',
      });
    Swal.showLoading();
    this.auth.newUser(this.user)
    .subscribe(resp => {
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Your created new Count',
        showConfirmButton: false,
        timer: 3500
      })
      this.router.navigateByUrl('/login');
    }, (err) =>{
      console.log(err.error.error.message);
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
