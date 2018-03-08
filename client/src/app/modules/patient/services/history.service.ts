import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { replaceKeys } from 'app/utils';

@Injectable()
export class HistoryService {
  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getHistoryData(): Observable<any> {
    return this.http.get<Array<any>>(this.url + 'historyData')
    .map(dataArray => dataArray.map((data) => replaceKeys(data, [
      { replace: 'diagnosis', with: 'title' },
      { replace: 'name', with: 'subtitle' }
    ])));
  }

  getRealHistoryData(): Observable<any> {
    const token: string = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization' : 'JWT ' + token});
    console.log(token)
    return this.http.get<Array<any>>('http://localhost:8000/api/prescriptions/', {headers : headers});
  }

}
