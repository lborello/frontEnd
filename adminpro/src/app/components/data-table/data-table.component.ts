import { Component, OnInit, Input } from '@angular/core';
import {ExcelService} from '../../services/service.index';
import * as jsPDF from 'jspdf';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styles: []
})
export class DataTableComponent implements OnInit {

 @Input ()  getLiveData: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1
    }, {
    eid: 'e102',
    ename: 'ram',
    esal: 1000
    }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 1000
    }];

@Input ()  data: any = [] ;
  date: any;
constructor(private excelService: ExcelService ) {}
ngOnInit() {}
  // print = () => {
  //   let doc = new jsPDF();
  //   doc.autoTable({
  //     head: [['Log','', 'Amount']],
  //     body: this.getLiveData()
  //     //returning [["log1", "$100"], ["log2", "$200"]]
  //   });
  //   doc.save('table.pdf');
  // }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'sample error'   );
 }
  exportAsPDF() {
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.rect(20, 20, 10, 10); // empty square
  doc.text(20, 20, 'This is a title');

  doc.line(20, 20, 60, 20); // horizontal line

  doc.setLineWidth(0.5);
  doc.line(20, 25, 60, 25);

  doc.setLineWidth(1);
  doc.line(20, 30, 60, 30);

  doc.setLineWidth(1.5);
  doc.line(20, 35, 60, 35);

  doc.setDrawColor(255, 0, 0); // draw red lines

  doc.setLineWidth(0.1);
  doc.line(100, 20, 100, 60); // vertical line

  doc.setLineWidth(0.5);
  doc.line(105, 20, 105, 60);

  doc.setLineWidth(1);
  doc.line(110, 20, 110, 60);

  doc.setLineWidth(1.5);
  doc.line(115, 20, 115, 60);
  doc.setFontSize(16);
  doc.text(20, 30, 'This is some normal sized text underneath.');
  doc.setTextColor(100);
  doc.text(20, 20, 'This is gray.');

  doc.setTextColor(150);
  doc.text(20, 30, 'This is light gray.');

  doc.setTextColor(255, 0, 0);
  doc.text(20, 40, 'This is red.');

  doc.setTextColor(0, 255, 0);
  doc.text(20, 50, 'This is green.');

  doc.setTextColor(0, 0, 255);
  doc.text(20, 60, 'This is blue.');

  doc.save('a4.pdf');

  console.log('archivo');

 }

}
