import { Component, OnInit } from '@angular/core';

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

  public switchIt ( num ) {
    var btns = document.getElementsByClassName("nav-button");
    if(num == 1){
      btns[0].classList.remove('selected');
      btns[1].classList.add('selected');
    }
    else {
      btns[1].classList.remove('selected');
      btns[0].classList.add('selected');
    }
  }
}
