import { Component } from '@angular/core';
import { NoticiasServiceService } from '../misServicios/noticias-service.service';
import { IArticulo, INoticia } from '../misInterfaces/noticias-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  listaNoticias: IArticulo[] = [];
  catNoticias: string[] = ["general", "business", "entertainment", "health", "science", "sports", "technology"];
  apiKey: string = "95f72f17192c44e5861827c824a05dce";
  categoriaSeleccionada: string = this.catNoticias[0];

  constructor(private leerNoticias: NoticiasServiceService, private consultaRest: HttpClient) {
    //this.listaNoticias = this.leerNoticias.getNoticias();
    this.cargarNoticias(this.categoriaSeleccionada);
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

  cambioCategoria(evento:any){
    this.categoriaSeleccionada = evento.detail.value;
    console.log(this.categoriaSeleccionada);
    this.cargarNoticias(this.categoriaSeleccionada);
    
  }

  cargarNoticias(categoria: string){

    let respObservable:Observable<INoticia> = this.consultaRest.get<INoticia>("https://newsapi.org/v2/top-headlines?category="+categoria+"&apiKey=" + this.apiKey);
    
    respObservable.subscribe(datos=>{
      //console.log(this.catNoticias);
      this.listaNoticias.push(...datos.articles);
    });
          
  }
}
