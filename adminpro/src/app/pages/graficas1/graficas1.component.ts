import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {
// Doughnut
  public doughnutChartLabels: Label[] = ['Ventas', 'In-Store Sales', 'Mail-Order Sales'];
  labels: string [] =  ['Ventaspadre', 'In-Stopadreo', 'Mail-padre'];
  public doughnutChartLabels1: Label[] = ['Ventas', 'ventas en salon1', 'Ventas por internet'];
  public doughnutChartData: MultiDataSet = [[350, 550, 100]];
  public doughnutChartData1: MultiDataSet = [[550, 50, 100]];
  public doughnutChartType: ChartType = 'doughnut' ;
  public Type: ChartType = 'bar' ;
  public typeBar: string = 'bar' ;
  tituloLuis: string = 'tituloluiseeeee';

  graficos: any = {
    'grafico1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'El pan se come con'
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Entrevistados'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': '¿Le dan gases los frijoles?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': '¿Le importa que le den gases?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

  
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
