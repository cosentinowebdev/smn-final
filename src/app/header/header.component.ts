import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  monitoreo=[
    {url:"sissa/como-estamos/hace-cuanto-no-llueve",nombre:"ESTADO ACTUAL DE LA SEQUIA"},
    {url:"sissa/esi/un-periodo-esi",nombre:"Precipitación estimada por datos de satélite y observaciones in situ (CHIRPS)"}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
