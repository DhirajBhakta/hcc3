import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { replaceKeys } from 'app/utils';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {

  url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.url + 'pharma_notifications').map(dataArray =>
      dataArray.map(data =>
        replaceKeys(data, [{
          replace: 'patient_name',
          with: 'title'
        }])));
  }

}
