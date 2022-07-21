import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from  '@angular/forms' ;
import { formatDate } from '@angular/common';
import { SissaInfoService } from 'src/app/servicios/sissa-info.service';
import { ListaFechas } from 'src/app/modelos/listaFechas';

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
  listaFechas: ListaFechas[]=[];

  constructor(public route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private sissaInfoService: SissaInfoService) {
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
        case "un-periodo-esi":
          this.sissaInfoService.getFechasDisponiblesESI(4,"valores_esi")
            .subscribe(arg => {
              console.log(arg.fechas_disponibles);
              this.listaFechas=arg.fechas_disponibles;
              console.log(this.listaFechas);
              this.formGroup.controls["periodo"].setValue(arg.fechas_disponibles[0].fecha)
            });
            const fechaEsi = new Date();
            this.formGroup = this._formBuilder.group({
              producto:  ["total",Validators.required],
              // fecha:  [formatDate(fecha2, 'yyyy-MM-dd', 'en'),Validators.required],
              escala:[3,Validators.required],
              tipoVisualizacion:["fecha",Validators.required],
              ano: [fechaEsi.getFullYear(),Validators.required],
              periodo: ["2022-07-11",Validators.required],
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
    // console.log(this.formGroup.controls["tipoVisualizacion"].value);
    this.valoresFormGroup = this.formGroup.value;
  }

}
