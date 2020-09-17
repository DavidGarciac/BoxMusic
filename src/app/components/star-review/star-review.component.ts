import { Component, OnInit, Input} from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { StarService } from '../../services/star.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html', styles: [`
  .rating-list li {
    float: right;
    color: #ddd;
    padding: 10px 5px;
}
.rating-list li:hover,
.rating-list li:hover~li,
.rating-list li.selected {
    color: #ffd700;
}
.rating-list {
    display: inline-block;
    list-style: none;
}
`],
})
export class StarReviewComponent implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  selectedValue: any = 0;
  textValue: any;
  usersrating: any;
  color: string = "light";
  value: any = null; //RATING DE ESTRELLAS A UN ALBUM
 
  // tslint:disable-next-line: no-input-rename
  @Input('idalbum') idalbum;
  // tslint:disable-next-line: no-input-rename
  @Input('portada') portada;
  // tslint:disable-next-line: no-input-rename
  @Input('iduser') iduser;

  constructor(private starService: StarService,private auth: AuthService) {
}

  ngOnInit(): void {
    this.starService.getUserAlbumStarr(this.iduser[0],this.idalbum[0]).subscribe(val => {
      if(val){
        console.log("entra");
        this.value = val;
        var outerHtmlElement: any = val;
        console.log(outerHtmlElement[0].value);
        this.selectedValue = outerHtmlElement[0].value;
        this.textValue = outerHtmlElement[0].coment;
      }
     });

    this.starService.getAllStarAlbum(this.idalbum[0]).subscribe(res =>{
      console.log("ALLSTARS");
      let contador = 0;
      let values = 0;
      res.forEach(doc => {
           var outerHtmlElement: any = doc;
           contador = contador + 1;
           values = outerHtmlElement.value + values;
           });
      this.usersrating = values/contador;
      switch(true) {
        case (this.usersrating > 7.99): {
          console.log("entra");
           this.color = "success";
           break;
        } 
        case (this.usersrating>4.99): {
          this.color = "warning";
           break; 
        } 
        case (this.usersrating>0): { 
          this.color = "danger";
           break; 
        } 
        default: { 
           //statements; 
           break; 
        }
     }
     });
  }

  countStar(star) {
    console.log("text value " +this.textValue);
    if(typeof this.textValue  === 'undefined'){ 
      this.starService.setStar(this.iduser[0], this.idalbum[0], star);
    } else{
      this.starService.setReview(this.iduser[0], this.idalbum[0], star, this.textValue);
    }
    this.selectedValue = star;
    this.ngOnInit();
    console.log('Value of star', star);
  }



  SaveComent(){
    if(typeof this.textValue  === 'undefined'){ 
      document.getElementById('exampleModal').click();
    }
    this.starService.setReview(this.iduser[0], this.idalbum[0], this.selectedValue, this.textValue);
    Swal.fire({
      icon: 'success',
      title: 'Your Review  is saved',
      // text: star ,
      //html: ' <i style="color:#ffd700;" class="fa fa-star"></i>',
      showConfirmButton: true,
    })
    document.getElementById('exampleModal').click();
  }



}
