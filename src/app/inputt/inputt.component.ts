import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-inputt',
  templateUrl: './inputt.component.html',
  styleUrls: ['./inputt.component.css']
})
export class InputtComponent implements OnInit {

    sem : string;
    isEvenSem : boolean;
    year : string;
    dept : string;
    sub : string;
    assgn : string;
    noOfQues : number;
    name : string;
    batch : string;
    roll : string;
    show_logo : boolean = true;
    btn : string = "get_app";

    cols = new Array<Mapp>();

    ngOnInit() {

        //Enable scolling based on device width
        if(screen.width < 569)
            document.getElementById("scroller").style.width = screen.width + "px";
        
        //Semester numbers
        let date = new Date();
        let yr = date.getFullYear();

        if(date.getMonth() < 6) {
            this.year = (yr - 1) + "-" + yr.toString().slice(2,4) + "(EVEN)";
            this.isEvenSem = true;
        }
        else {
            this.year = yr + "-" + (yr + 1).toString().slice(2,4) + "(ODD)";
            this.isEvenSem = false;
        }
    }

    //Create Questions data structure
    makemap() {
        let numz;
        for(numz=this.cols.length; numz<this.noOfQues; numz++) {
            this.cols.push({
                "ques" : "",
                "cos" : "",
                "marks" : ""
            });
        }
        if(this.noOfQues < this.cols.length)
            for(numz=this.cols.length; numz>=this.noOfQues; numz--)
                this.cols.pop();
    }


    //jspdf to make PDF
    public getPDF() {  
        let paper = document.getElementById("page"); //DOM ELEMENT
        html2canvas(paper, {
            scale : 6
        })
        .then(canvas => { //Promise
            let pdf = new jspdf('p', 'pt', 'a4');   
            var position = 0;
            //direct canvas instead of data URL reduces filesize i.e. filesize independent of vertical resolution
            pdf.addImage(canvas, 'JPEG', 0, position, paper.offsetWidth, paper.offsetHeight);
            if (paper.innerHTML.includes("Course Outcome Learned"))
            pdf.save('Exp_Fp.pdf'); 
            else
            pdf.save(this.sub+"_"+this.assgn+'_Fp.pdf'); 
        })
        .catch(error => {
            console.error("Geez!!");
        });  
    }

    //htmlcanvas to make PNG
    public getPNG() {
        html2canvas(document.getElementById('page'), {
            scale : 6
        })
        .then(canvas => {
            let dataURL = canvas.toDataURL();
            var link = document.createElement('a');
            
            if (document.getElementById('page').innerHTML.includes("Course Outcome Learned"))
            link.download = 'Exp_Fp.png';
            else
            link.download = this.sub+"_"+this.assgn+'_Fp.png';
            link.href = dataURL;
            link.click();
        });
    }

    //Scroll to page in devices where page is not initially visible
    public scrollIt() {
        document.getElementById('page').scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    //Download button icon change
    toggler() {
        document.getElementById('actionz').classList.toggle('op');
        if (this.btn === 'get_app')
          this.btn = "close";
        else
          this.btn = "get_app";
      }
}

class Mapp {
    ques : string;
    cos : string;
    marks :string;
}