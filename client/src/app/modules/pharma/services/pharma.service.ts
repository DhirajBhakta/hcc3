import { Injectable } from '@angular/core';
import { URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { JWTHttpClient } from 'app/services/jwthttp.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


import { replaceKeys, prepareURL } from 'app/utils';
import { environment } from 'environments/environment';

@Injectable()
export class PharmaService {

  constructor(private http: JWTHttpClient) { }

  getDrugNames() {
    /*For autocomplete: get only id and trade_name. dont retrieve batches*/
    let params = new URLSearchParams();
    params.set('fields', JSON.stringify(['id', 'trade_name']));
    return this.http.get(prepareURL(environment.server_base_url, 'drugs'), { params });
  }

  getInventory() {
    return this.http.get(prepareURL(environment.server_base_url, 'batches'));
  }

  submitStockUpdate(stock_drugs) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(prepareURL(environment.server_base_url, 'batches'), stock_drugs, options);
  }

  submitNewDrug(new_drug) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(prepareURL(environment.server_base_url, 'drugs'), new_drug, options);
  }

}
