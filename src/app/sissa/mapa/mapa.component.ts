import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';
import {ActivatedRoute, Params, Router} from '@angular/router';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { SissaInfoService } from '../../servicios/sissa-info.service';
import * as d3 from 'd3';
const parseGeoraster = require("georaster"); 
const geoblaze = require('geoblaze'); 
import 'leaflet-draw';
import { Location } from '@angular/common';
import { parametro } from '../../modelos/parametro';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  @Input() data:any;
  private map: any;
  geotiffUrl: String = "";
  georasterObj: any;
  icon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      iconUrl: '../../assets/images/marker-icon.png',
      shadowUrl: '../../assets/images/marker-shadow.png'
    })
  };
  markerGroup: any = L.layerGroup();
  rasterGroup: any = L.layerGroup();
  histogramGroup: any = L.layerGroup();
  colorScale: any;
  drawOptions: any = {
    draw: false
  }
  rectangleDrawer: any;
  polygonDrawer: any;
  currentRoute:any = "";
  parametros: parametro[]=[];
  idTipo: any;
  idEndpoint: any;
  modal: any;


  constructor(private sissaInfoService: SissaInfoService,
    public route: ActivatedRoute) {
    this.route.params.forEach((params: Params) => {

      this.idTipo = params["idTipo"];
      this.idEndpoint = params["idEndpoint"];
      console.log(this.idTipo);
      console.log(this.idEndpoint);
      if (this.map) {
        this.map.remove();
        // this.initMap();
      }

      // this.llamaServicio(this.data);
    });
    

   }


  ngOnInit(): void {
    // console.log("data");
    // console.log(this.data);
    // this.llamaServicio(this.data);
    this.modal = document.getElementById("modal");
    this.modal.style.display = "block";
  }
  llamaServicio(data:any){
    console.log("llamaServicio");
    console.log(this.idEndpoint);
    switch (this.idEndpoint) {
      case 'prueba-ruster':
        this.sissaInfoService.getRaster().subscribe(arg =>{
          console.log(arg.geotiff);
          this.parametros=[];
          arg.legend.forEach((element: any) => {
            let paramet = new parametro(element)
            this.parametros.push(paramet)
          });
          console.log(arg.legend);
          
          console.log(this.parametros);
          
          const preblob = this.converBase64toBlob(arg.geotiff,'image/tiff');
          var blobURL = URL.createObjectURL(preblob);
          this.loadGeotiffAsLayer(blobURL);
          this.agregarLeyenda(this.parametros,"Categoría de sequía");
          this.modal.style.display = "none";
        })
        break;
      
      case 'prueba-geojson':
        //feat geo
          this.sissaInfoService.getGeojson().subscribe(arg => {
            let res:any = arg.geojson;
            this.parametros=[];
            arg.legend.forEach((element: any) => {
              let paramet = new parametro(element)
              this.parametros.push(paramet)
            });
            let color:string[] = [];

            this.parametros.forEach(element => {
              for (let index = element.desde; index < element.hasta; index++) {
                color.push(element.color)
              }
            });
            console.log(color);
            var colors = d3.scaleQuantize<string, number>()
            .domain([0,60])
            .range(color.reverse());

            for (const c of res.features) {
              const lon = c.geometry.coordinates[0];
              const lat = c.geometry.coordinates[1];
              const circle = L.circleMarker([lat, lon]);

              if (c.properties.dias_secos>data.cantidadPrecipitaciones) {
                circle.setStyle({fillColor:colors(c.properties.dias_secos).toString(),fillOpacity:0.7,color:"#000",weight:1});
                circle.addTo(this.map);
              }

              
            }
            this.agregarLeyenda(this.parametros,"Dias sin lluvia");
            this.modal.style.display = "none";
          });
           
        break;

      case 'hace-cuanto-no-llueve':
        //feat geo
          this.sissaInfoService.haceCuantoQueNoLLueve(data.fecha,data.cantidadPrecipitaciones).subscribe(arg => {
            let res:any = arg.geojson;
            this.parametros=[];
            arg.legend.forEach((element: any) => {
              let paramet = new parametro(element)
              this.parametros.push(paramet)
            });
            let color:string[] = [];

            this.parametros.forEach(element => {
              for (let index = element.desde; index < element.hasta; index++) {
                color.push(element.color)
              }
            });
            console.log(color);
            var colors = d3.scaleQuantize<string, number>()
            .domain([0,60])
            .range(color.reverse());

            for (const c of res.features) {
              const lon = c.geometry.coordinates[0];
              const lat = c.geometry.coordinates[1];
              const circle = L.circleMarker([lat, lon]);

              if (c.properties.dias_secos>data.cantidadPrecipitaciones) {
                circle.setStyle({fillColor:colors(c.properties.dias_secos).toString(),fillOpacity:0.7,color:"#000",weight:1});
                circle.addTo(this.map);
              }

              
            }
            this.agregarLeyenda(this.parametros,"Dias sin lluvia");
            this.modal.style.display = "none";
          });
            
        break;

      default:
        this.sissaInfoService.getRaster().subscribe(
          res=>{
            console.log(res);
            this.parametros=[];
            res.parametros.forEach((element: any) => {
              let paramet = new parametro(element)
              this.parametros.push(paramet)
            });
            const preblob = this.converBase64toBlob(res.fileTiff,'image/tiff');
            var blobURL = URL.createObjectURL(preblob);
            this.loadGeotiffAsLayer(blobURL);
            this.agregarLeyenda(this.parametros,"error");
            this.modal.style.display = "none";
          }
        );
        
      break;
        
    }
  }
  addColorPuntosGeoJson(res:any){
    let color:string[] = [];
    this.parametros=[];
    this.parametros.forEach(element => {
      for (let index = element.desde; index < element.hasta; index++) {
        color.push(element.color)
      }
    });

    var colors = d3.scaleQuantize<string, number>()
    .domain([0,60])
    .range(color.reverse());
    return colors;
  }

  ngOnChanges(changes: any) {
    
    
    if (this.map) {
      console.log(changes.data.currentValue);
      console.log(document.getElementsByClassName("legend"));
      const elementoHTML:HTMLElement = document.getElementsByClassName("legend")[0] as HTMLElement;
      elementoHTML.remove();
      this.map.remove();
      this.initMap();
      this.llamaServicio(changes.data.currentValue);
    }else{
      console.log(changes.data.currentValue);
      this.initMap();
      this.llamaServicio(changes.data.currentValue);
    }
    
  } 

  private initMap(): void {
    this.map = L.map('map').setView([-22, -57], 5);
    const tiles = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png', {
      attribution: '&copy; smn contributors'
    });
     if (document.getElementsByClassName("legend")[0]) {
       const elementoHTML:HTMLElement = document.getElementsByClassName("legend")[0] as HTMLElement;
       L.DomUtil.remove(elementoHTML);
     }
    // const drawControl = new L.Control.Draw(this.drawOptions);
 
    // this.map.addControl(drawControl);
    tiles.addTo(this.map);

  }
  agregarLeyenda(parametros:parametro[],titulo:string):void{

    var legend = L.control.attribution({position: 'bottomright'}); // L.control({position: 'bottomright'})
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = '<h3>'+titulo+'</h3>';
        parametros.forEach(element => {
          div.innerHTML += '<i style="background:'+element.color+';opacity:1;padding-left:14px;"></i>'+element.desc+'<br>';
        });
        
        div.id = "leyenda";
        return div;
    };
    legend.addTo(this.map);
  }

  ngAfterViewInit(): void {
    // this.initMap();
  }

  loadGeotiffAsLayer(url: any): void {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        parseGeoraster(arrayBuffer).then((raster: any) => {
          this.georasterObj = raster;
          this.addGeorasterLayer(raster);
        });
      });
  }

  addGeorasterLayer(raster: any): void {
    //var scale = chroma.scale('Viridis').domain([raster.mins[0], raster.maxs[0]]);
     
    this.rasterGroup.clearLayers();
    this.histogramGroup.clearLayers();
    this.markerGroup.clearLayers(); 
    this.updateMapLayer(raster, 1);
    this.sissaInfoService.updateMap(this.map);
    this.sissaInfoService.colorScale.next(this.colorScale);
  }

  updateMapLayer(raster: any, opacity: any) {

    let color:string[] = [];
    this.parametros=[];
    this.parametros.forEach(element => {
      for (let index = element.desde; index < element.hasta; index++) {
        color.push(element.color)
      }
    });

    var colors = d3.scaleQuantize<string, number>()
    .domain([0,60])
    .range(color.reverse());
    let scale = d3.scaleSequential(d3.interpolateOrRd);
    console.log(scale);
    this.colorScale = scale;
    var layer = new GeoRasterLayer({
      georaster: raster,
      opacity: 0.6,
      resolution: 256,
      pixelValuesToColorFn: function (values): any {
        var pixel = values[0];    
        if (pixel < 0) return;        
        return colors(pixel);
      }
    });
    
    this.rasterGroup.addTo(this.map);
    layer.addTo(this.rasterGroup);
    this.map.fitBounds(layer.getBounds());
    
  }

  getElevation(event: any){
    this.markerGroup.addTo(this.map);
    const latlng = [event.latlng.lng, event.latlng.lat];
    const elevation = Math.round(geoblaze.identify(this.georasterObj, latlng) * 100) / 100;
    if (elevation > 0) {
      const marker = L.marker([latlng[1], latlng[0]], this.icon).addTo(this.markerGroup);
      marker.bindPopup("<b>Elevation:&nbsp;</b>" + elevation + "&nbsp;m").openPopup().on("popupclose", e => {
        this.markerGroup.removeLayer(e.target._leaflet_id);
      })
    }
  }

  changeOpacity(opacity: any) {
    var layer = this.rasterGroup.getLayers()[0];
    if (layer != undefined) {
      layer.setOpacity(opacity);
    }
  }

  changeColor(color: string) {
    let scale = d3.scaleSequential([this.georasterObj.mins[0], this.georasterObj.maxs[0]], d3.interpolateViridis);
    switch (color) {
      case "inferno":
        scale = d3.scaleSequential([this.georasterObj.mins[0], this.georasterObj.maxs[0]], d3.interpolateInferno);
        break
      case "turbo":
        scale = d3.scaleSequential([this.georasterObj.mins[0], this.georasterObj.maxs[0]], d3.interpolateTurbo);
        break
      case "magma":
        scale = d3.scaleSequential([this.georasterObj.mins[0], this.georasterObj.maxs[0]], d3.interpolateMagma);
        break
      case "plasma":
        scale = d3.scaleSequential([this.georasterObj.mins[0], this.georasterObj.maxs[0]], d3.interpolatePlasma);
        break
      case "cividis":
        scale = d3.scaleSequential([this.georasterObj.mins[0], this.georasterObj.maxs[0]], d3.interpolateCividis);
        break
      case "warm":
        scale = d3.scaleSequential([this.georasterObj.mins[0], this.georasterObj.maxs[0]], d3.interpolateMagma);
        break
      case "cool":
        scale = d3.scaleSequential([this.georasterObj.mins[0], this.georasterObj.maxs[0]], d3.interpolateCool);
        break

    }
    this.colorScale = scale;
    this.sissaInfoService.colorScale.next(this.colorScale);
    let layer = this.rasterGroup.getLayers()[0];
    var pixelValuesToColorFn = (values: any) => {
      var pixel = values[0];
      if (pixel < 0) return;
      return scale(pixel);
    }
    layer.updateColors(pixelValuesToColorFn);
  }


  // startDrawRectangle() {
  //   this.histogramGroup.clearLayers();
  //   this.histogramGroup.addTo(this.map);
  //   this.rectangleDrawer = new L.Draw.Rectangle(this.map, this.drawOptions.draw.rectangle);
  //   this.rectangleDrawer.enable();
  //   this.map.on(L.Draw.Event.CREATED, (e: any) => {
  //     this.rectangleDrawer.disable();
  //     e.layer.addTo(this.histogramGroup);
      
  //   })
  // }

  // startDrawPolygon() {
  //   this.histogramGroup.clearLayers();
  //   this.histogramGroup.addTo(this.map);
  //   this.polygonDrawer = new L.Draw.Polygon(this.map, this.drawOptions.draw.rectangle);
  //   this.polygonDrawer.enable();
  //   this.map.on(L.Draw.Event.CREATED, (e: any) => {
  //     this.polygonDrawer.disable();
  //     e.layer.addTo(this.histogramGroup);
  //   })
  // }

  getHistogram() {
    console.log("inside gethistogram")
    const scaleType = 'ratio';
    const numClasses = 5;
    const classType = 'equal-interval';
    const layer = this.histogramGroup.getLayers()[0];
    let result = geoblaze.histogram(this.georasterObj, layer.toGeoJSON(), { scaleType, numClasses, classType });
    let response = [];
    
    for (const [key, val] of Object.entries(result[0])) {
      response.push({ 'elevation': key, 'frequency': val as number });
    }
    this.sissaInfoService.histogram.next(response);
  }

  converBase64toBlob(content:any, contentType:string) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    }); //statement which creates the blob
    return blob;
    
  }

}

// export class MapaComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
