
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { NoticiaCardComponent } from './noticia-card/noticia-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ExploreContainerComponent, NoticiaCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NoticiaCardComponent,
    ExploreContainerComponent
  ]
})
export class MisComponentesModule { }
