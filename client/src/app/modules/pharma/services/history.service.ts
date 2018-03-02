import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { replaceKeys } from 'app/utils';

@Injectable()
export class HistoryService {

  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.url + 'pharma_history');
  }


}
