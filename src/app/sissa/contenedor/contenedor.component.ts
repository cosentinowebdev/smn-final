import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
export class ContenedorComponent implements OnInit {

  constructor(public route: ActivatedRoute) {
    this.route.params.forEach((params: Params) => {
      console.table(params);
    });
  }

  ngOnInit(): void {
  }

}
