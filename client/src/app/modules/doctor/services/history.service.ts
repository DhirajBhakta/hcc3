import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { JWTHttpClient } from 'app/services/jwthttp.service';
import { Observable } from 'rxjs/Observable';
import { prepareURL } from 'app/utils';

@Injectable()
export class HistoryService {

  constructor(private http: JWTHttpClient) { }

  getPrescriptions() {
    return this.http.get(prepareURL(environment.server_base_url, 'prescriptions'))
                    .map((response)=> response.json());
  }
}
