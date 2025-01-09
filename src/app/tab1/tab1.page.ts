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

  
  listaCategorias: string[] = ["general", "business", "technology", "science", "sports", "entertainment", "health"];
  apiKey: string = "95f72f17192c44e5861827c824a05dce";
  
  listaNoticias: IArticulo[] = [];

  constructor(public leerNoticias: NoticiasServiceService, private consultaRest: HttpClient) {
    //Llamamos a la funcion cargarNoticia con el primer elemento del array
    this.cargarNoticias(this.listaCategorias[0]);
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
  //recogemos el valor de la categoria y se lo pasaos como parametro a cargarNoticias()
  public cambioCategoria(eventoR: any){
    this.listaNoticias = [];
    console.log(eventoR.detail.value);
    this.cargarNoticias(eventoR.detail.value);
  }
  //Añadiendo el parámetro de categoría podemos hacer una consulta rest con esa categoria
  private cargarNoticias(categoria: string){
    //para poder realizar la consulta generamos un observable y nos suscribimos a la respuesta en cuanto la tenga
    let respuesta: Observable<INoticia> = this.consultaRest.get<INoticia>("https://newsapi.org/v2/top-headlines?category=" + categoria + "&apiKey=" + this.apiKey);
    
    respuesta.subscribe( datos => {
      //console.log(this.catNoticias);
      if (datos && Array.isArray(datos.articles)) {
      this.listaNoticias.push(...datos.articles);
      }
    });
          
  }
}
