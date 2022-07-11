import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from  '@angular/forms' ;

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  idTipo: any;
  idEndpoint: any;
  formGroup!: FormGroup;

  constructor(public route: ActivatedRoute,
    private _formBuilder: FormBuilder) {
    this.route.params.forEach((params: Params) => {
      console.table(params);
      this.idTipo = params["idTipo"];
      this.idEndpoint = params["idEndpoint"];
    });
   }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      campoPrueba:  ['',Validators.required],
      otroCampoPrueba:  ['',Validators.required],
    })
  }
  onSubmit(): void{
    alert("algo");
  }

}
