
import { Component } from '@angular/core';
import { NoticiasServiceService } from '../misServicios/noticias-service.service';
import { IArticulo, INoticia } from '../misInterfaces/noticias-interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listaNoticias: IArticulo[] = [];


  constructor(private leerNoticias: NoticiasServiceService) {
    this.listaNoticias = this.leerNoticias.getNoticias();
  }

    // Comprueba si la noticia seleccionada (checked) está para leer o no
  
  seleccionado(articulo: IArticulo): boolean {
    let indice: number = this.leerNoticias.buscarNoticia(articulo);
    if (indice != -1) {
      return true;
    }
     return false; 
  }  

      // Cuando cambia el check, en función de su valor añade o borra la noticia del array
  siNoticia(eventoRecibido: any, item: IArticulo) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.leerNoticias.añadirNoticia(item);
    } else {
      this.leerNoticias.borrarNoticia(item);
    }
  }


}
