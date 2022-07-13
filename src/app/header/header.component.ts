import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  monitoreo=[
    {url:"sissa/informes/como-estamos/",nombre:"ESTADO ACTUAL DE LA SEQUÍA"},
    {url:"sissa/monitoreo/indices-de-sequia",nombre:"Índices de sequía "},
    {url:"sissa/monitoreo/precipitacion-estimada-por-satelite",nombre:"Estimaciones de precipitación"},
    {url:"sissa/monitoreo/prueba-ruster",nombre:'prueba-ruster'},
    {url:"sissa/monitoreo/prueba-geojson",nombre:'prueba-geojson'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
