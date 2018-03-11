import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JWTHttpClient extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) {
    let token = localStorage.getItem('JWT');
    options.headers.set('Authorization', `JWT ${token}`);
    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('JWT');
    if (typeof url === 'string') {
      if (!options)
        options = { headers: new Headers() };
      options.headers.set('Authorization', `JWT ${token}`);
    }
    else
      url.headers.set('Authorization', `JWT ${token}`);
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: JWTHttpClient) {
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}
