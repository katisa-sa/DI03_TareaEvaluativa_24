import { Component } from '@angular/core';
import { IArticulo } from '../misInterfaces/noticias-interface';
import { NoticiasServiceService } from '../misServicios/noticias-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  listaNoticias:IArticulo[] = [];

  constructor( private gestionNoticia: NoticiasServiceService, private alertController: AlertController) {
    this.listaNoticias = gestionNoticia.getNoticiasSeleccionadas();
  }

  borrarArticulo(articulo: IArticulo){
    this.gestionNoticia.borrarNoticia(articulo);
  }
  async presentAlert(articulo:IArticulo){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Borrar noticia',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Borrar',
          handler: () => {
            // Implementa el metodo para borrar la noticia si se pulsa el boton borrar
            this.gestionNoticia.borrarNoticia(articulo);
          }
        }
      ]
    });
    await alert.present();
  }
  
}

