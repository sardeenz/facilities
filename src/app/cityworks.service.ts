import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ServiceRequest, Value } from './service-request';

@Injectable()
export class CityworksService {

  constructor(private http: HttpClient) { }

  private getSRUrl = 'http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/getServiceRequest/';

  getServiceRequest(requestid): Observable<ServiceRequest> {

    const url = this.getSRUrl + requestid;
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers }); // Create a request option
    // return this.http.post(this.srUrl, this.testSr, options).map((res: Response) => res.json());

    return this.http.get<ServiceRequest>(url);
  }

}
