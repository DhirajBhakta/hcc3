import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-http-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.css']
})
export class HttpErrorComponent implements OnInit {
  error_code = 404;
  error_message: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       if (params.hasOwnProperty('error_code'))
        this.error_code = +params['error_code'];
       switch (this.error_code){
         case 401: this.error_message = 'You\'re not authorized! Login again'; break;
         case 400: this.error_message = 'Bad request'; break;
         case 403: this.error_message = 'Forbidden'; break;
         case 500: this.error_message = 'Internal Server error'; break;
         case 504: this.error_message = 'Gateway Timeout'; break;
         case 404: this.error_message = 'The page you were looking for appears to have been moved, deleted or does not exist.'; break;
         default: this.error_message = 'Something went wrong'; break;
       }
    });
  }

}
