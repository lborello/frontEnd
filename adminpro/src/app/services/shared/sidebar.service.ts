import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {
menu: any [] = [] ;
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'ProgressBar', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'RXJS', url: '/rxjs' }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' }
  //     ]
  //   }

  // ];




  // ------------------------------
  // ver en el Backend server  en login.js  la funcion function obtenerMenu(ROLE) {
    // alli se encuentran los menu
    // ---------------------
  constructor(
     // tslint:disable-next-line: variable-name
     public _usuarioService: UsuarioService
  ) {
   
  }
  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
