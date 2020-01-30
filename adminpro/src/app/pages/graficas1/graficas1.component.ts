import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {
//   data: any = [{
//     eid: 'e101',
//     ename: 'ravi',
//     esal: 1000,
//     titulo: 'luisis titulo'
//   }, {
//     eid: 'e102',
//     ename: 'ram',
//     esal: 2000
//   }, {
//     eid: 'e103',
//     ename: 'rajesh',
//     esal: 3000
//   }, {
//     eid: 'e103',
//     ename: 'rajesh',
//     esal: 3000
//   }, {
//     eid: 'e103',
//     ename: 'rajesh',
//     esal: 3000
//   }, {
//     eid: 'e103',
//     ename: 'rajesh',
//     esal: 3000
//   }, {
//     eid: 'e103',
//     ename: 'rajesh',
//     esal: 3000
//   }
// ];

data: any = [  {
  "uuid": "2acf1f30-3e0f-11ea-b74c-1f103bbeba07",
  "nombre": "actualizado luis",
  "url": null,
  "apellido": "Apellidoluis@hotmail.com",
  "username": null,
  "createdAt": null,
  "updatedAt": null,
  "myDate": "2020-01-23T18:35:45.187Z"
},
{
  "uuid": "3ad0dea0-3e0f-11ea-b74c-1f103bbeba07",
  "nombre": "luis@hotmail.com",
  "url": null,
  "apellido": "Apellidoluis@hotmail.com",
  "username": null,
  "createdAt": null,
  "updatedAt": null,
  "myDate": "2020-01-23T18:36:12.042Z"
},
{
  "uuid": "4ad55c30-3e1a-11ea-a2a7-fd26bc8d518d",
  "nombre": "hola@hotmail.com",
  "url": null,
  "apellido": "Apellidoluis@hotmail.com",
  "username": "holasisi",
  "createdAt": null,
  "updatedAt": null,
  "myDate": "2020-02-23T18:35:10.611Z"
}];
graficos: any = {
    grafico1: {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data: [24, 30, 46],
      type: 'doughnut',
      leyenda: 'El pan se come con'
    },
    grafico2: {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      type: 'doughnut',
      leyenda: 'Entrevistados'
    },
    grafico3: {
      labels: ['Si', 'No'],
      data: [95, 5],
      type: 'doughnut',
      leyenda: '¿Le dan gases los frijoles?'
    },
    grafico4: {
      labels: ['No', 'Si'],
      data: [85, 15],
      type: 'doughnut',
      leyenda: '¿Le importa que le den gases?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
