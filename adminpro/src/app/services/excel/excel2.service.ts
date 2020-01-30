import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from './carlogo.js';
import * as logoAdmin from './logo.js';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ExcelService2 {
  constructor(private datePipe: DatePipe) {
  }
  async generateExcel(titulo: string, jsonDatos: any[]) {
    // Documentacion https://www.npmjs.com/package/exceljs
    const title = titulo;
    const data = jsonDatos;
    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Datos ' + this.datePipe.transform(new Date(), 'yyyy_MM_dd'));
    // Add Image
    const logoCard = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });
    
    const logo = workbook.addImage({
      base64: logoAdmin.logoBase64,
      extension: 'png',
    });

  

    // titulos
    worksheet.addImage(logo, 'E1:F2');
    worksheet.addRows(['']);

    const tituloExcel = [];
    tituloExcel[2] = title;
    const tituloExcelStyle = worksheet.addRow(tituloExcel);
    tituloExcelStyle.font = {
      name: 'Arial',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true
    };
    worksheet.addRows(['']);
    const subTituloExcel = [];
    subTituloExcel[1] = 'Fecha:' + this.datePipe.transform(new Date(), 'dd/MM/yyy');
    subTituloExcel[3] = 'Hora:' + this.datePipe.transform(new Date(), 'HH:mm');
    const subTituloExcelStyle = worksheet.addRow(subTituloExcel);
    subTituloExcelStyle.font = {
      name: 'Arial',
      family: 4,
      size: 12,
      // underline: 'double',
      bold: true
    };
    worksheet.addRows(['']);
    // Creacion de las columnas ;
    const colData = [];
    const colDataBind = [];
    data.forEach((value, index) => {
      if (index == 0) {
        Object.entries(value).forEach((key, index1) => { // Ller los datos Clave Valor
          colData[index1] = key[0].toUpperCase();
          colDataBind[index1] = { header: '', key: key[0], width: 10 };
        });
      }
    });
    // Style Column
    const tituloColumn = worksheet.addRow(colData);
    tituloColumn.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'CAE3E8' },
        bgColor: { argb: 'BFF4FF' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = {
        name: 'Arial Black',
        color: { argb: '024A5C' },
        family: 2,
        size: 10,
        italic: true
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
    worksheet.columns = colDataBind;
    // Auto Filter
    worksheet.autoFilter =  {
      from: 'A6',
      to: 'H6',
    };
    let colorRow: boolean = false;
    let rowfgColor;
    data.forEach((value) => {
      const rowDatos = worksheet.addRow(value);
      if (colorRow) {
        colorRow = false;
        rowfgColor = 'A1FFE3';
      } else {
        colorRow = true;
        rowfgColor = '8EE0C8';
      }
      rowDatos.eachCell((cell) => {
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
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'left'
        };
      });
      });
    // link to web
    // worksheet.getCell('B2').value = {
    //   text: 'www.basaargentina.com',
    //   hyperlink: 'http://www.basaargentina.com.ar'
    // };
    // worksheet.getCell('A1').fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: '5D678F' },
    //   bgColor: { argb: 'FF0000FF' }
    // };
    worksheet.addRow(['']);
    // Footer Row
    const footerRow = worksheet.addRow(['Informe Generado: ' +  this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')  ]);
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
