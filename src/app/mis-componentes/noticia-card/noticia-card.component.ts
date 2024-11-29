import { NoticiasServiceService } from './../../misServicios/noticias-service.service';
import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IArticulo } from 'src/app/misInterfaces/noticias-interface';

@Component({
  selector: 'app-noticia-card',
  templateUrl: './noticia-card.component.html',
  styleUrls: ['./noticia-card.component.scss'],
})
export class NoticiaCardComponent   {

  //para que los datos puedan rellenarse en tab2
  @Input() articulo: IArticulo = {} as IArticulo;

  constructor(private gestionNoticia: NoticiasServiceService) { }


}
