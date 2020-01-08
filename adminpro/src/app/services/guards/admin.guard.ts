import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService
  ) { }
  canActivate() {
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE' ) {
      return true;
    } else {
      this._usuarioService.logout();
      console.log('Bloqueado por el admin.guard ');
      return false;
    }
  }
}
