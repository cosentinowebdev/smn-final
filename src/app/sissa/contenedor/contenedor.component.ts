import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ListaSolapas } from 'src/app/modelos/listaSolapas';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {
  listaSolapasComoEstamos:ListaSolapas[] =[
    {"url":"sissa/como-estamos/hace-cuanto-no-llueve","nombre":"¿Hace cuánto que no llueve?","activo":false,"clasesCss":"primero"},
    {"url":"url","nombre":"¿Qué estaciones están en sequía?","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"¿En qué estaciones llovió mucho?","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"¿Qué zonas están en sequía?","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"¿En qué zonas llovió mucho?","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"¿Cuánta área está en sequía?","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"Comparación de sequías entre dos períodos","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"Evolución de sequías entre dos períodos","activo":false,"clasesCss":"ultimo"}
  ];
  listaSolapasIndicesDeSequia:ListaSolapas[] =[
    {"url":"url","nombre":"Resumen","activo":false,"clasesCss":"primero"},
    {"url":"url","nombre":"Series temporales","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"Mapas de calor","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"Mapas","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"Eventos","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"Rankings","activo":false,"clasesCss":"contenido"},
    {"url":"url","nombre":"Ayuda","activo":false,"clasesCss":"ultimo"}

  ];
  listaSolapas:ListaSolapas[]=[];
  ultimo: any=1;
  constructor(public route: ActivatedRoute) {
    this.route.params.forEach((params: Params) => {
      switch (params['idTipo']) {
        case "como-estamos":
          this.listaSolapas=this.listaSolapasComoEstamos;
          this.ultimo = this.listaSolapas.length-1;
          break;
        
        case "indices-de-sequia":
          this.listaSolapas=this.listaSolapasIndicesDeSequia;
          this.ultimo = this.listaSolapas.length-1;
          break;
        default:
          this.listaSolapas=this.listaSolapasComoEstamos;
          this.ultimo = this.listaSolapas.length-1;
          break;
      }
    });
  }

  ngOnInit(): void {
  }

}
