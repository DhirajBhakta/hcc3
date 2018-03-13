import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  @Input()source: any[];
  @Input("value-attr") value_attr: string;
  @Input("display-attr") display_attr: string;
  @Input("placeholder") placeholder:string;
  @Output() onSelected = new EventEmitter<any>();
  public user_input: string = '';
  public suggestions: string[] = [];

  constructor() { }

  ngOnInit(){ }

  generateSuggestions() {
    console.log('source',this.source);
    if (this.user_input != '')
      this.suggestions = this.source.filter(item => item[this.display_attr].toUpperCase().includes(this.user_input.toUpperCase()));
  }

  select(item) {
    let selected = this.value_attr ?item[this.value_attr]:item;
    this.user_input = item[this.display_attr];
    this.suggestions = [];
    this.onSelected.emit(selected);
  }


}
