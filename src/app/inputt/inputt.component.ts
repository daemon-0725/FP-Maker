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
    cols = new Array<Mapp>();

    ngOnInit() {
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

    public getPDF() {  

        html2canvas(document.getElementById("page"))
                   .then(canvas => {

                        const dataURL = canvas.toDataURL("image/png");

                        //Few necessary setting options  
                        var imgWidth = 208;   
                        var pageHeight = 295;    
                        var imgHeight = canvas.height * imgWidth / canvas.width;  
                        var heightLeft = imgHeight; 
                    
                        const contentDataURL = canvas.toDataURL('image/png')  
                        let pdf = new jspdf('p', 'mm', 'a4');   
                        var position = 0;  
                        pdf.addImage(contentDataURL, 'JPEG', 0, position, imgWidth, imgHeight);  
                        pdf.save(this.sub+"_"+this.assgn+'_Fp.pdf'); 
                    })
                    .catch(error => {
                        console.error("Geez!!");
                    });  
    }

    public getPNG() {
        /*domtoimage.toJpeg(document.getElementById('page'), {quality : 1.00})
                  .then(dataURL => {
                      let link = document.createElement('a');
                      link.download = this.sub+"_"+this.assgn+'_Fp.jpeg';
                      link.href = dataURL;
                      link.click();
                  });*/
        html2canvas(document.getElementById('page'))
                   .then(canvas => {
                        let dataURL = canvas.toDataURL();
                        var link = document.createElement('a');
                        link.download = this.sub+"_"+this.assgn+'_Fp.png';
                        link.href = dataURL;
                        link.click();
                   });
    }
}

class Mapp {
    ques : string;
    cos : string;
    marks :string;
}