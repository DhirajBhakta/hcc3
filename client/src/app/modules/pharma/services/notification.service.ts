import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { URLSearchParams, RequestOptions } from '@angular/http';
import { prepareURL } from 'app/utils';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/empty';
import { JWTHttpClient } from '../../../services/jwthttp.service';
import { environment } from 'environments/environment';

@Injectable()
export class NotificationService {

  params: URLSearchParams;
  requestOptions: RequestOptions;

  constructor(private http: JWTHttpClient) {
    this.params = new URLSearchParams();
    this.requestOptions = new RequestOptions();
  }

  getData(status: string = 'N'): Observable<any> {
    this.params.set('status', status);
    this.requestOptions.search = this.params;
    return this.http
      .request(prepareURL(environment.server_base_url, 'pharmarecords'), {params : this.params})
      .map(response => JSON.parse(response['_body']));
  }
  loopForData(): Observable<any> {
    return Observable.interval(5000)
      .startWith(0)
      .switchMap(() => this.getData());
  }
  createDispensed(object): Observable<any> {
    return this.http
      .post(prepareURL(environment.server_base_url, 'dispensed/'), object);

  }

}
