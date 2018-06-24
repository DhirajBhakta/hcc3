import { Component, OnInit } from '@angular/core';
import { WorkbenchService} from '../services/workbench.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labreport',
  templateUrl: './labreport.component.html',
  styleUrls: ['./labreport.component.css']
})
export class LabreportComponent implements OnInit {

  report;
  constructor(private route:ActivatedRoute, private workbenchService:WorkbenchService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       let id = +params['id'];
       this.workbenchService.getLabReport(id).subscribe((data)=>this.report=data);
    });
  }

  getAge(dob){
       return moment().diff(dob, 'years');
  }

}
