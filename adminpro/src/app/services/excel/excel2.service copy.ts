import { Injectable, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from './carlogo.js';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Injectable({
  providedIn: 'root'
})
export class ExcelService2 {
  constructor(private datePipe: DatePipe) {
  }
  async generateExcel(titulo: string, jsonDatos: any[]) {

    // const ExcelJS = await import('exceljs');
    // console.log(ExcelJS);
    // const Workbook: any = {};

    // Excel Title, Header, Data
    const title = titulo;
    const data = jsonDatos;
    const columnValor: string [] = [] ;
    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Car Data');
    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);

    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
    // Add Image
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });

    worksheet.addImage(logo, 'E1:F3');
    worksheet.mergeCells('A1:D2');
    
    // Add image to a cell
    worksheet.addImage(logo, {
      tl: { col: 3, row: 3 },
      ext: { width: 500, height: 200 }
    });

    // Imagen de  Fondo
    worksheet.addBackgroundImage(logo);
    // Add image with hyperlinks 
    // worksheet.addImage(logo, {
    //   tl: { col: 0, row: 0 },
    //   ext: { width: 500, height: 200 },
    //   hyperlinks: {
    //     hyperlink: 'http://www.somewhere.com',
    //     tooltip: 'http://www.somewhere.com'
    //   }
    // });

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1 }
    ];
    worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});
    worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});

   
    worksheet.autoFilter = 'A6:C6';
    // Blank Row
    // worksheet.addRow([]);

    // Add Header Row

    // const headerRow = worksheet.addRow(header);
    // const headerRow = worksheet.addRow(["e101","ravi","1000"]);
    // // Cell Style : Fill and Border
    // headerRow.eachCell((cell, number) => {
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: 'FFFFFF00' },
    //     bgColor: { argb: 'FF0000FF' }
    //   };
    //   cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    // });

    // worksheet.addRows(data);

    //  console.log(data);

    // data.forEach(([value, index, array]) => {
    //   console.log(value);
    //   console.log(index);
    //   console.log(array);

    // });
    const vacio = [];
    let headerRow;
    let row;
    let colorRow: boolean = false ;
    data.forEach((value, index, array) => {
      const valor = [];
      Object.entries(value).forEach(([key1, value1]) => { // Ller los datos Clave Valor
        // console.log(`${key1} ${value1}`);
        valor.push(value1);
        // tslint:disable-next-line: triple-equals
        if (index == 0) {
          columnValor.push(key1.toUpperCase());
          worksheet.getColumn(1).width = 10;
          worksheet.getColumn(2).width = 20;
          worksheet.getColumn(3).width = 60;
        }
      });
      // console.log("columnValor " + columnValor);
      if (index == 0) {
        headerRow = worksheet.addRow(columnValor);
      }
      row = worksheet.addRow(valor);
      // console.log('valor ' + valor);

      // Color y estilo de los rows  colorRow
      let rowfgColor = 'FFFFFF00' ;
      if ( colorRow) {
        colorRow = false;
        rowfgColor = 'CAE8CF';
      } else {
        colorRow = true;
       }
      row.eachCell((cell , number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: rowfgColor },
          bgColor: { argb: 'FF0000FF' }
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.font = {
          name: 'Arial Black',
          color: { argb: '301C0F' },
          family: 2,
          size: 10,
          italic: true
        };
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'}
        };
      });


      vacio.push(valor);
    });
    // console.log("avacio " + vacio);
    // Blank Row
    worksheet.addRow([]);
    // Add Header Row

    //  const headerRow = worksheet.addRow(header);
    // const headerRow = worksheet.addRow(columnValor);



    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        //   fgColor: { argb: 'FFFFFF00' },
        fgColor: { argb: 'CDFA66' }, // amarillo
        bgColor: { argb: '301C0F' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.font = {
        name: 'Arial Black',
        color: { argb: '301C0F' },
        family: 2,
        size: 14,
        italic: true
      };
    });


    // data.forEach(obj => {
    //   const valor =[];
    //   const rowValor = [];
    //   Object.entries(obj).forEach(([key, value, index]) => {
    //     console.log(`${key} ${value}`);
    //     valor.push(value);
    //     columnValor.push(key);
    //   });
    //   console.log(rowValor);
    //   rowValor.push(valor);
    //   //console.log(rowValor);
    //   console.log('columnValor' + columnValor);
    //   // const row = worksheet.addRow(valor);
    //   console.log('-------------------');
    // });



    // Add Data and Conditional Formatting
    // data.forEach(d => {
    // const row = worksheet.addRow(d);


    row = worksheet.addRow(['titulo', '2']);
    const qty = row.getCell(1);
    let color = 'FF99FF99';
    console.log(qty.value);
    if (qty.value < 500) {
      color = 'FF9999';
    } else {
      color = 'FF9999';
    }

    qty.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color }
    };
    // }

    // );

    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);
// 
// link to web
    worksheet.getCell('A8').value = {
      text: 'www.basaargentina.com',
      hyperlink: 'http://www.basaargentina.com.ar'
    };
    // Footer Row
    const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'CarData.xlsx');
    });

  }
}
