import { Injectable } from '@angular/core';
import { IArticulo, INoticia } from '../misInterfaces/noticias-interface';
import { HttpClient } from '@angular/common/http';
import { AlmacenStorageServiceService } from './almacen-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class NoticiasServiceService {
  //declaramos e inicializamos la lista de noticias
  listaNoticias: IArticulo[] = [];
  noticiasSeleccionadas: IArticulo[] = [];
  
  
  constructor(private leerFichero: HttpClient, private almacenarNoticias: AlmacenStorageServiceService) { 
    //recuperamos los datos del almacenamiento si los hubiera    
    let noticiasPromesa: Promise<IArticulo[]> = almacenarNoticias.getObject("noticias");
    noticiasPromesa.then( datos=> {
      if (Array.isArray(datos)) {
      this.noticiasSeleccionadas.push(...datos);
      }
    })
  }

  /*//metodo que lee las noticias de articulos.json
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
  }*/

  // metodo para obtener la lista de noticias
  /*getNoticias(){
    return this.listaNoticias;
  }*/

  getNoticiasSeleccionadas(){
    return this.noticiasSeleccionadas;
  }

  //metodo para añadir una noticia nueva 
  añadirNoticia(nuevaNoticia: IArticulo){
    let articuloString = JSON.stringify(nuevaNoticia);
    nuevaNoticia = JSON.parse(articuloString);
    // añadimos a la lista de noticias una noticia nueva
    this.noticiasSeleccionadas.push (nuevaNoticia);
    this.almacenarNoticias.setObject("noticias", this.noticiasSeleccionadas);
  }

  //buscamos el indice de una noticia y lo retornamos
  buscarNoticia(articulo:IArticulo): number{
    let indice:number = this.noticiasSeleccionadas.findIndex(
      function(datos){
        return JSON.stringify(datos) ==JSON.stringify(articulo);
      }
    )   
    return indice;
  }

  // borramos una noticia de la lista de seleccionados
  borrarNoticia(articulo: IArticulo){
    let indice = this.buscarNoticia(articulo);
    if(indice != -1) {
      this.noticiasSeleccionadas.splice(indice, 1);
      this.almacenarNoticias.setObject("noticias", this.noticiasSeleccionadas);
    }
  }

  
}
