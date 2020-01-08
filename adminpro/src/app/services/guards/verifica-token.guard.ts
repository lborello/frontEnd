import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    // tslint:disable-next-line: variable-name
    public router: Router
  ) { }
  canActivate(): Promise<boolean> | boolean {
    console.log('Token guard verificado ');
    const token = this._usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirado = this.expirado(payload);
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }


  verificaRenueva(fechaExp: number): Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();
      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));
      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }

      resolve(true);
    });
  }
  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }
}
