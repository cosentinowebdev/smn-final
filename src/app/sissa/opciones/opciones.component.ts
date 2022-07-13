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
  valoresFormGroup: any;

  constructor(public route: ActivatedRoute,
    private _formBuilder: FormBuilder) {
    this.route.params.forEach((params: Params) => {
      
      this.idTipo = params["idTipo"];
      this.idEndpoint = params["idEndpoint"];
      console.table(this.idEndpoint);
      switch (this.idEndpoint) {
        case "prueba-ruster":
          this.formGroup = this._formBuilder.group({
            campoPrueba:  ['algo',Validators.required],
            otroCampoPrueba:  ['algo',Validators.required],
          });
          console.log("prueba ruster");
          break;
        case "prueba-geojson":
          this.formGroup = this._formBuilder.group({
            campoPrueba:  ['algo',Validators.required],
            otroCampoPrueba:  ['algo',Validators.required],
          });
          console.log("prueba geojson");
          break;
        default:
          this.formGroup = this._formBuilder.group({
            campoPrueba:  ['algo',Validators.required],
            otroCampoPrueba:  ['algo',Validators.required],
          });
          console.log("default");
          break;
      }
    });
   }

  ngOnInit(): void {


  }
  onSubmit(): void{
    this.valoresFormGroup = this.formGroup.value
  }

}
