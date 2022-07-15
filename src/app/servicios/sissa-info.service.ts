import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SissaInfoService {



  map = new BehaviorSubject<any>(null);
  colorScale = new Subject();
  histogram = new Subject();

  constructor(private http: HttpClient) { }

  /*
  * este ehdwwjkldajskldjkashdklj
  */
  getRaster() {
    var url = '/return-ruster';
    return this.http
    .get<any>(
    `${environment.apiUrl}${url}`)
    .pipe(
        tap((res: any) => {
            if (res) {
                // console.log(res.parametros);
                
            }
        })
    );
  }
  getGeojson() {
    var url = '/return-geojson';
    return this.http
    .get<any>(
    `${environment.apiUrl}${url}`)
    .pipe(
        tap((res: any) => {
            if (res) {
                // console.log(res);
                
            }
        })
    );
  }
  updateMap(map: any) {
    this.map.next(map);
  }
}
