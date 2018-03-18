import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { replaceKeys } from 'app/utils';
import {JWTHttpClient} from "../../../services/jwthttp.service";

@Injectable()
export class HistoryService {

  url = 'http://localhost:3000/';

  constructor(private http: JWTHttpClient) { }

  getData(): Observable<any> {
    return this.http.get(this.url + 'pharma_history');
  }


}
