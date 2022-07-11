import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  {path: '',component:ContenedorComponent,
    
    // children:[
    //   {path: 'lista', component:UsuariosListaComponent},
    //   {path: 'editar/:id', component:UsuariosEditarComponent},
    //   {path: 'agregar', component:UsuariosAgregarComponent}
    // ]
  },
  {path: ':idTipo/:idEndpoint',component:ContenedorComponent},
  //idTipo -> Ruster, geojson, grafico 
  //idEndPontit -> el id del endpoint :v
  {path: 'mapa',component:MapaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SissaRoutingModule { }
