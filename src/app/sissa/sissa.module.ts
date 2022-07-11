import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SissaRoutingModule } from './sissa-routing.module';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { MapaComponent } from './mapa/mapa.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { MaterialModule } from 'src/material.module';

@NgModule({
  declarations: [
    ContenedorComponent,
    MapaComponent,
    OpcionesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SissaRoutingModule
  ]
})
export class SissaModule { }
