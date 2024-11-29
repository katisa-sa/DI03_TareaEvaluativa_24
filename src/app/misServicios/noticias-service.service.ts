
import { Injectable } from '@angular/core';
import { IArticulo, INoticia } from '../misInterfaces/noticias-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasServiceService {
  //declaramos e inicializamos la lista de noticias
  listaNoticias: IArticulo[] = [];
  noticiasSeleccionadas: IArticulo[] = [];
  

  constructor(private leerFichero: HttpClient) { 
    //llamamos al método para que cargue la lista de noticias que se lee del archivo json al inicializar
    this.getNoticiasFichero();
  }

  //metodo que lee las noticias de articulos.json
  getNoticiasFichero(){
    //declaramos la variable que va a ser un observable de un array noticias
    let datosFichero: Observable<INoticia>;

    //inicializamos la variable 
    datosFichero = this.leerFichero.get<INoticia>("/assets/datos/articulos.json");

    //Nos suscrinimos a los datos y le decimos que hacer con ellos
    datosFichero.subscribe(datos => {
      console.log(datos);
      //añadimos los datos al array de noticias
      this.listaNoticias.push(...datos.articles);
        })
  }
  // metodo para obtener la lista de noticias
  getNoticias(){
    return this.listaNoticias;
  }
  getNoticiasSeleccionadas(){
    return this.noticiasSeleccionadas;
  }

  //metodo para añadir una noticia nueva 
  añadirNoticia(nuevaNoticia: IArticulo){
    let articuloString = JSON.stringify(nuevaNoticia);
    nuevaNoticia = JSON.parse(articuloString);
    // añadimos a la lista de noticias una noticia nueva
    this.noticiasSeleccionadas.push (nuevaNoticia);
  }

  buscarNoticia(articulo:IArticulo): number{
    let indice:number = this.noticiasSeleccionadas.findIndex(
      function(datos){
        return JSON.stringify(datos) ==JSON.stringify(articulo);
      }
    )   
    return indice;
  }

  borrarNoticia(articulo: IArticulo){
    let indice = this.buscarNoticia(articulo);
    if(indice = -1) {
      this.noticiasSeleccionadas.splice(indice, 1);
    }
  }


}
