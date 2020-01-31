import { Component, OnInit, Input, ElementRef, ViewChild,Renderer2,  EventEmitter, Output } from '@angular/core';
import { ExcelService } from '../../services/service.index';
import { ExcelService2 } from '../../services/excel/excel2.service';
import * as jsPDF from 'jspdf';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styles: []
})
export class DataTableComponent implements OnInit {
  @Input() getLiveData: any = [];
  @Input() data: any = [];
  @Output() datoActualidados = new EventEmitter<any>();
  @ViewChild('abcd', {static: false}) abcd: ElementRef;
  @ViewChild('divinput', {static: false}) divinput: ElementRef;
  @ViewChild('colum0', {static: false}) colum0: ElementRef;
  @ViewChild('colum1', {static: false}) colum1: ElementRef;
  @ViewChild('datos10', {static: false}) datos10: ElementRef;

  date: any;
  colun = [];
  columCount = 0;
  datosLuis = 'ddd';
  constructor(
    private excelService: ExcelService,
    private excelService2: ExcelService2 ,
    private renderer: Renderer2 ) { }
  ngOnInit() {
    this.data.forEach((currentValue, index, arr) => {
      if (index == 0) {
        Object.entries(currentValue).forEach(([key]) => {
          this.colun.push(key);
          this.columCount = this.columCount + 1;
        });
      }
      console.log ( this.columCount);
    });
  }

  addfield()  {
    // this.datoActualidados.emit('Este dato viajará hacia el padre');
    this.datoActualidados.emit(this.data);
    const p: HTMLParagraphElement = this.renderer.createElement('input');
    p.innerHTML = "add new"
    p.setAttribute( 'value', '1');
    p.setAttribute ('type' , 'number');
    
  // p.setAttribute ('[(ngModel)]', '"datosLuis"');
    this.renderer.appendChild(this.divinput.nativeElement, p);
// console.log(this.divinput.nativeElement.children[1]);
// console.log(this.divinput.nativeElement.children[0]);
// console.log(this.divinput.nativeElement.children);
this.renderer.setStyle

this.renderer.setStyle(this.colum1.nativeElement, 'width', '200px');
this.renderer.setStyle(this.colum1.nativeElement, 'border', '2px solid red');
 
console.log(this.datos10);

     //this is for append a child element 
     }
  crearElemento(){
    const li = this.renderer.createElement('li');
    const text = this.renderer.createText('Click here to add li');
    this.renderer.appendChild(li, text);
    this.renderer.appendChild(this.abcd.nativeElement, li);
    
    const input1 = this.renderer.createElement('div');
    const text1 = this.renderer.createText('Click here to add li');
    this.renderer.appendChild(input1, text1);
    this.renderer.appendChild(this.divinput.nativeElement, input1);

    const textboxes = document.querySelector('#textboxes'); //to get element
    this.renderer.addClass(textboxes , "col-md-6"); //this is for add class 
    let divel= this.renderer.createElement('div'); //this is for create an element 
    this.renderer.appendChild(textboxes, divel); 

    
  }
  evento(evento, item) {
    console.log(this.data);
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.data, 'sample error');
  }
  exportAsPDF() {
    //  documentaion https://artskydj.github.io/jsPDF/docs/
    const doc = new jsPDF();
    const img = new Image();
    img.src = '/assets/images/logo.jpg';
    doc.addImage(img, 'JPEG', 30, 50, 50, 50);
    const divTable = document.getElementById('tabla22');
    doc.setFontSize(7);
    for (let indexy = 1; indexy < 300; indexy++) {
      indexy = indexy + 4;
      for (let index = 0; index < 300; index++) {
        doc.text(index, indexy, 'x' + index + 'Y' + indexy);
        index = index + 14;
      }
    }
    doc.text('hola 1570', 15, 70);
    doc.fromHTML(divTable, 30, 30);
    doc.save('a4.pdf');
  }
  generateExcel() {
    this.excelService2.generateExcel('Reporte de luis', this.data);
  }
}
