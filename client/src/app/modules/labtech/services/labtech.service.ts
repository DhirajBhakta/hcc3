import { Injectable } from '@angular/core';
import { JWTHttpClient } from 'app/services/jwthttp.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { replaceKeys, prepareURL } from 'app/utils';
import { environment } from 'environments/environment';


@Injectable()
export class LabtechService {

  constructor(private http:JWTHttpClient) { }

  getNotifications(){
    return Observable.interval(1000)
      .switchMap(() => this.http.get(prepareURL(environment.server_base_url, 'labreports') + '?done=' + false))
      .map((data) => data.json())
  }
  submitLabReport(report_id,report){
    return this.http.patch(prepareURL(environment.server_base_url,'labreports',report_id), report);
  }

}
