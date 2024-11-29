
import { Injectable } from '@angular/core';
import { INoticia } from '../misInterfaces/noticias-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasServiceService {
  //declaramos e inicializamos la lista de noticias
  listaNoticias: INoticia[] = [];

  constructor(private leerFichero: HttpClient) { 
    //llamamos al método para que cargue la lista de noticias que se lee del archivo json al inicializar
    this.getNoticiasFichero();
  }

  //metodo que lee las noticias de articulos.json
  getNoticiasFichero(){
    //declaramos la variable que va a ser un observable de un array noticias
    let datosFichero: Observable<INoticia[]>;

    //inicializamos la variable 
    datosFichero = this.leerFichero.get<INoticia[]>("/assts/datos/articulos.json");

    //Nos suscrinimos a los datos y le decimos que hacer con ellos
    datosFichero.subscribe(datos => {
      console.log(datos);
      //añadimos los datos al array de noticias
      this.listaNoticias.push(...datos);
        })
  }
  // metodo para obtener la lista de noticias
  getNoticias(){
    return this.listaNoticias;
  }

  //metodo para añadir una noticia nueva 
  añadirNoticia(nuevaNoticia: INoticia){
    // añadimos a la lista de noticias una noticia nueva
    this.listaNoticias.push (nuevaNoticia);
  }
}
