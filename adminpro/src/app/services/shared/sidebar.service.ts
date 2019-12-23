import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' }
      ]
    },
    {
      titulo: 'Principal2',
      icono: 'mdi mdi-album',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo : 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' }
      ]
    }
  ];

  constructor() { }

}
