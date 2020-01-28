import { Component, OnInit, Input } from '@angular/core';
import {ExcelService} from '../../services/service.index';
import {ExcelService2} from '../../services/excel/excel2.service';
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
    esal: 2000
    }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
    }, {
      eid: 'e103',
      ename: 'rajesh',
      esal: 3000
      }
  
  ];

@Input ()  data: any = [] ;
  date: any;
constructor(
  private excelService: ExcelService, 
  private excelService2: ExcelService2 ) {}
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
 generateExcel() {
  // https://stackoverflow.com/questions/9581623/json-array-convert-to-javascript-array
  // const obj = JSON.parse({'2017', '1', 'Volkswagen ', 'Volkswagen Passat', '1267', '10'});
  // const data = JSON.parse({'AÑO':2017, '1', 'Volkswagen ', 'Volkswagen Passat', '1267', '10'});
  //     [2017, 1, 'Volkswagen ', 'Volkswagen Passat', 1267, 10],
  //     [2007, 1, 'Toyota ', 'Toyota Rav4', 819, 6.5]] ;
  const data = [
    [2017, 1, 'Volkswagen ', 'Volkswagen Passat', 1267, 10],
    [2007, 1, 'Toyota ', 'Toyota Rav4', 819, 6.5],
    [2007, 1, 'Toyota ', 'Toyota Avensis', 787, 6.2],
    [2007, 1, 'Volkswagen ', 'Volkswagen Golf', 720, 5.7],
    [2007, 1, 'Toyota ', 'Toyota Corolla', 691, 5.4],
    [2007, 1, 'Peugeot ', 'Peugeot 307', 481, 3.8],
    [2008, 1, 'Toyota ', 'Toyota Prius', 217, 2.2],
    [2008, 1, 'Skoda ', 'Skoda Octavia', 216, 2.2],
    [2008, 1, 'Peugeot ', 'Peugeot 308', 135, 1.4],
    [2008, 2, 'Ford ', 'Ford Mondeo', 624, 5.9],
    [2008, 2, 'Volkswagen ', 'Volkswagen Passat', 551, 5.2],
    [2008, 2, 'Volkswagen ', 'Volkswagen Golf', 488, 4.6],
    [2008, 2, 'Volvosss ', 'Volvo V70', 392, 3.7],
    [2008, 2, 'Toyota ', 'Toyota Auris', 342, 3.2],
    [2008, 2, 'Volkswagen ', 'Volkswagen Tiguan', 340, 3.2],
    [2008, 2, 'Toyota ', 'Toyota Avensis', 315, 3],
    [2008, 2, 'Nissan ', 'Nissan Qashqai', 272, 2.6],
    [2008, 2, 'Nissan ', 'Nissan X-Trail', 271, 2.6],
    [2008, 2, 'Mitsubishi ', 'Mitsubishi Outlander', 257, 2.4],
    [2008, 2, 'Toyota ', 'Toyota Rav4', 250, 2.4],
    [2008, 2, 'Ford ', 'Ford Focus', 235, 2.2],
    [2008, 2, 'Skoda ', 'Skoda Octavia', 225, 2.1],
    [2008, 2, 'Toyota ', 'Toyota Yaris', 222, 2.1],
    [2008, 2, 'Honda ', 'Honda CR-V', 219, 2.1],
    [2008, 2, 'Audi ', 'Audi A4', 200, 1.9],
    [2008, 2, 'BMW ', 'BMW 3-serie', 184, 1.7],
    [2008, 2, 'Toyota ', 'Toyota Prius', 165, 1.6],
    [2008, 2, 'Peugeot ', 'Peugeot 207', 144, 1.4]
  ];
  const col = ['Year', 'Month', 'Make', 'modelo', 'Quantity', 'Pct'];
  // this.excelService2.generateExcel('Reporte de luis', col , data);
  this.excelService2.generateExcel('Reporte de luis', this.data);
  
}
}
