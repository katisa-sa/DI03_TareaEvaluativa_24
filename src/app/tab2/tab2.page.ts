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
    //cargamos la lista de noticias seleccionadas desde el servicio
    this.listaNoticias = gestionNoticia.getNoticiasSeleccionadas();
  }
  //borramos las noticias desde el servicio
  borrarArticulo(articulo: IArticulo){
    this.gestionNoticia.borrarNoticia(articulo);
  }

  //creamos una alerta que confirme si se quiere borrar la noticia o no
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

