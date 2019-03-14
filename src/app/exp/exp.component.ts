import { Component, OnInit } from '@angular/core';
import { InputtComponent } from '../inputt/inputt.component';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css']
})
export class ExpComponent implements OnInit {

  show_logo : boolean = true;
  expr : number;
  name : string;
  batch : string;
  roll : string;
  btn : string = "get_app";
  POs : string = "";
  CO_text : string;
  constructor() { }

  ngOnInit() {

  }

  toggler() {
    document.getElementById('actionz').classList.toggle('op');
    if (this.btn === 'get_app')
      this.btn = "close";
    else
      this.btn = "get_app";
  }

  getPDF () {
    new InputtComponent().getPDF();
  }

  getPNG () {
    new InputtComponent().getPNG()
  }

  public scrollIt () {
    document.getElementById('page').scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
