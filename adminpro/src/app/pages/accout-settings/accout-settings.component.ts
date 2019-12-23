import { Component, OnInit, Inject } from '@angular/core';

import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor(  public _ajustes: SettingsService ) {
   }

  ngOnInit() {
    this.ColocarCheck ( ) ;
  }
  CambiarColor(tema: string, link: any) {
    // this.aplicarCheck(link);
    
    this._ajustes.aplicarTema (tema );
    this._ajustes.guardarAjustes();
    this.ColocarCheck () ;
    // const url: string = `assets/css/colors/${tema}.css`;
    // this._document.getElementById('tema').setAttribute('href', url);
    // this._ajustes.ajustes.tema = tema ;
    // this._ajustes.ajustes.temaUrl = url ;
    // console.log( 'cambiar color ' +  this._ajustes.ajustes.tema);
   }
  // aplicarCheck(link: any) {
  //   // tslint:disable-next-line: prefer-const
  //   let selectores: any = document.getElementsByClassName('selector');
  //   // tslint:disable-next-line: align
  //   for (const ref of selectores) {
  //     ref.classList.remove('working');
  //   }
  //   link.classList.add('working');
  // }
  ColocarCheck() {
    // tslint:disable-next-line: prefer-const
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema ;
    // tslint:disable-next-line: align


    for (const ref of selectores) {

      if (ref.getAttribute ('data-theme') === tema ) {
          ref.classList.add('working');
          console.log(ref.getAttribute ('data-theme') ) ;
      } else {
        ref.classList.remove('working');
      }
    
      // ref.classList.remove('working');
    }
    // link.classList.add('working');
  }

}
