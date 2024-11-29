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

  listaNoticias: INoticia[] = [];

  constructor(private leerNoticias: NoticiasServiceService) {
    

  }

  ngOnInit(){

    this.listaNoticias = this.leerNoticias.getNoticias();
  }

}
