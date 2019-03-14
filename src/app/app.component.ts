import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit () {
    var k = document.getElementsByClassName('nav-button');
    if (window.location.pathname.includes("experiment"))
      k[1].classList.add('selected');
    else
      k[0].classList.add('selected');
  }

  public switchIt() {
    var btns = document.getElementsByClassName("nav-button");
    if(btns[0].classList.contains('selected')){
      btns[0].classList.remove('selected');
      btns[1].classList.add('selected');
    }
    else {
      btns[1].classList.remove('selected');
      btns[0].classList.add('selected');
    }
  }
}
