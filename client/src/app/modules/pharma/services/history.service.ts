import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { replaceKeys } from 'app/utils';
import {JWTHttpClient} from "../../../services/jwthttp.service";

import { environment } from 'environments/environment';
import { prepareURL } from 'app/utils';

@Injectable()
export class HistoryService {


  constructor(private http: JWTHttpClient) { }

  getData(): Observable<any> {
    return this.http.get(prepareURL(environment.server_base_url, 'pharma_history'));
  }


}
