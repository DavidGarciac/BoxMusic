import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StarService } from '../../services/star.service';
import { FileItem } from 'src/app/models/file-item.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService,private starservice: StarService,private aut: AuthService) { }

  currentusu: any;
  urlimg: any;
  public recentactivity = [];
  bucle: number[] = [0, 1, 2, 3, 4];
  imagen: FileItem;
  archivos: FileItem[] = [];
  estasobreDrop: boolean = false;
  user: UsuarioModel = new UsuarioModel();

  ngOnInit(): void {
    this.auth.getUserfirebase( localStorage.getItem('uid')).subscribe(user => {
      this.currentusu = user;
      var outerHtmlElement: any = user;
      // this.urlimg = user[0].photo;
      this.urlimg = outerHtmlElement[0].photo;
      this.starservice.getRecentStars(outerHtmlElement[0].nombre).subscribe(recent => {
        this.recentactivity = recent;
        // console.log(this.recentactivity);
      });
  });

  }


  edit( form: NgForm){
    if (form.invalid){ return;}
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espera por favor...',
      icon: 'info',
      });
      Swal.showLoading();

    this.auth.updateUserData( this.user )
    .then(resp => {
      Swal.close();
      // this.router.navigateByUrl('/home');
     // console.log(resp);
    }, (err) => {
      console.log(err.error.error.message)
      Swal.fire({
        allowOutsideClick: false,
        text: err.error.error.message,
        title: 'Error al editar',
        titleText: 'Error',
        icon: 'error',
      });
    });
  }

  uploadImg(imagen: FileItem){
    console.log("archivoss"+JSON.stringify(this.archivos));
    this.aut.saveimg(this.archivos);
    Swal.fire({
      icon: 'success',
      title: 'Your new Photo is saved',
      // text: star ,
      //html: ' <i style="color:#ffd700;" class="fa fa-star"></i>',
      showConfirmButton: true,
    })
  }
  estaSobreElemento(){
    console.log("sobre");
  }


}
