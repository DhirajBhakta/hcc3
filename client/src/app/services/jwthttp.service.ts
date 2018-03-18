import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class JWTHttpClient extends Http {
 
  constructor(backend: XHRBackend, options: RequestOptions,private router: Router) {
    super(backend, options);
    let token = localStorage.getItem('JWT');
    options.headers.set('Authorization', `JWT ${token}`);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('JWT');
    if (typeof url === 'string') {
      if(!options)
        options = { headers: new Headers() };
      if (!options.headers)
        options.headers = new Headers();
      options.headers.set('Authorization', `JWT ${token}`);
    }
    else
      url.headers.set('Authorization', `JWT ${token}`);
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('JWT');
    if (typeof url === 'string') {
      if(!options)
        options = { headers: new Headers() };
      if (!options.headers)
        options.headers = new Headers();
      options.headers.set('Authorization', `JWT ${token}`);
    }
    else
      url.headers.set('Authorization', `JWT ${token}`);
   return super.post(url, body).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: JWTHttpClient) {
    return (res: Response) => {
      if ([400,401,403,500,504,404].includes(res.status))
        this.router.navigate(['/http-error', res.status]);
      return Observable.throw(res);
    };
  }
}
