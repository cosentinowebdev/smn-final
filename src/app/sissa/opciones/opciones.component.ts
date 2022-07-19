import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from  '@angular/forms' ;
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  idTipo: any;
  idEndpoint: any;
  formGroup!: FormGroup;
  valoresFormGroup: any;

  constructor(public route: ActivatedRoute,
    private _formBuilder: FormBuilder) {
    this.route.params.forEach((params: Params) => {
      
      this.idTipo = params["idTipo"];
      this.idEndpoint = params["idEndpoint"];
      console.log(this.idTipo);
      console.log(this.idEndpoint);
      switch (this.idEndpoint) {
        case "prueba-ruster":
          this.formGroup = this._formBuilder.group({
            campoPrueba:  ['algo',Validators.required],
            otroCampoPrueba:  ['algo',Validators.required],
          });
          this.valoresFormGroup = this.formGroup.value;
          break;
        case "hace-cuanto-no-llueve":
          const fecha2 = new Date();
          console.log(fecha2);
          this.formGroup = this._formBuilder.group({
            cantidadPrecipitaciones:  [0.1,Validators.required],
            // fecha:  [formatDate(fecha2, 'yyyy-MM-dd', 'en'),Validators.required],
            fecha:["2022-06-21",Validators.required]
            // 2022-06-21
          });
          this.valoresFormGroup = this.formGroup.value;
          break;
        case "prueba-geojson":
          const fecha = new Date();
          console.log(fecha);
          this.formGroup = this._formBuilder.group({
            cantidadPrecipitaciones:  [0,Validators.required],
            fecha:  [formatDate(fecha, 'yyyy-MM-dd', 'en'),Validators.required],
          });
          this.valoresFormGroup = this.formGroup.value;
          break;
        default:
          this.formGroup = this._formBuilder.group({
            campoPrueba:  ['algo',Validators.required],
            otroCampoPrueba:  ['algo',Validators.required],
          });
          this.valoresFormGroup = this.formGroup.value;
          console.log("default");
          break;
      }
    });
   }

  ngOnInit(): void {


  }
  onSubmit(): void{
    this.valoresFormGroup = this.formGroup.value;
  }

}
