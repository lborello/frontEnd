import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document   ) {
    // tslint:disable-next-line: no-unused-expression
    this.cargarAjustes();
    console.log('this.cargarAjustes');
  }
  
  guardarAjustes() {
    console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes' , JSON.stringify (this.ajustes) );
  }
  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      // obtiene los parametros en formato string  y el json.parse al tipo ajuste
      this.ajustes = JSON.parse( localStorage.getItem('ajustes')) ;
       // tslint:disable-next-line: align
       console.log('Cargando de localStorage') ;
       // tslint:disable-next-line: align
       console.log ( this.ajustes );
       // tslint:disable-next-line: align
       this.aplicarTema( this.ajustes.tema );
     } else {
      console.log('Usando Valores por defecto') ;
      this.aplicarTema( this.ajustes.tema );
    }
  }

  aplicarTema( tema: string ) {
    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    // aplicarCheck ()
    this.guardarAjustes();
  }
  aplicarCheck() {
      // tslint:disable-next-line: prefer-const
      let selectores: any = document.getElementsByClassName('selector');
      // tslint:disable-next-line: align
      for (const ref of selectores) {
        ref.classList.remove('working');
      }
      // link.classList.add('working');
    }
}
interface Ajustes {
  temaUrl: string;
  tema: string;
}
