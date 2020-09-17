import { Directive, ElementRef,  Input, Output, HostListener, EventEmitter} from '@angular/core';
import { FileItem } from 'src/app/models/file-item.model';
// import { FORMERR } from 'dns';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { runInThisContext } from 'vm';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  constructor() { }
  @Input() imagen: FileItem;
  @Input() archivos: FileItem[] = [];
  @Input() i: string;
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any){
   this.mouseSobre.emit(true);
   this._prevenirDetener( event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any){
   this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any){
   this.mouseSobre.emit(false);
   const transferencia = this._getTransferencia(event);
   if(!transferencia){
     return;
   }
   this.imagen = transferencia.files[0];
   this._extraerArchivos(transferencia.files);
   this._prevenirDetener( event);
   this.mouseSobre.emit(false);

  }

  private _getTransferencia( event: any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;

  } 

  private _extraerArchivos( img: FileList){
    //this.archivos = [];
    console.log( img);
    this.i = 'cambia';
    // tslint:disable-next-line: forin
    // this.imagen = img;
     // tslint:disable-next-line: forin
     // tslint:disable-next-line: one-line
     // tslint:disable-next-line: forin
    for ( const propiedad in Object.getOwnPropertyNames(img)){
           const archivoTemporal = img[propiedad];
          if ( this._archivoPuedeSerCargado(archivoTemporal)) {
           const nuevoArchivo = new FileItem(archivoTemporal);
          //  this.archivos.unshift(nuevoArchivo);
           this.archivos[0] = nuevoArchivo;
            }
       }
  }



  //VALIDACIONES
  private _archivoPuedeSerCargado( archivo: File): boolean{
      if( !this._archivoyadroppeado( archivo.name ) && this._esImagen(archivo.type)){
        return true;

      }else{
        return false;
      }

  }


  private _prevenirDetener( event){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoyadroppeado(nombreArchivo: string): boolean{
    for( const imag of [this.imagen]) { 
      if (imag.nombreArchivo == nombreArchivo) {
        console.log("YA EXISTE")
        return true;
      }
    }

    return false;

  }

  private _esImagen( tipoArchivo: string): boolean{
  return ( tipoArchivo ==='' || tipoArchivo === undefined )? false : tipoArchivo.startsWith('image');
  }


}
