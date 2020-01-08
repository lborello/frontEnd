import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert';
import { map, catchError } from 'rxjs/operators';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';





@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient,
              public router: Router,
    // tslint:disable-next-line: variable-name
              public _subirArchivoService: SubirArchivoService) {
    // console.log('Servicio de usuario listo :)');
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;
    return this.http.get(url).pipe (
      map ( (resp: any) => {
        this.token = resp.token ;
        localStorage.setItem('token', this.token);
        console.log ( 'Token renovado');
        return true ;
      } ),
      catchError(err => this.manejarError(err, 'NO fue posible renovar token'))
    );
  }
  
  
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }
  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }


// Inicio Login Google
  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        console.log(resp);
        return true;
      }),
      catchError(err => this.manejarError(err, 'Error Login Google'))
      );
  }
// Fin Login Google

  login(usuario: Usuario, recordar: boolean) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        }),
        catchError(err => this.manejarError(err, 'Usuario o contraseña incorrectas'))
      );
  }

  manejarError(err: HttpErrorResponse, errorPersonalizado: string) {
    console.warn(err.status);
    console.warn(err);
    if (errorPersonalizado) {
         swal( 'Error '  + err.status , errorPersonalizado, 'error' );
    } else {
      if (!err.error.mensaje) {
        swal('Error Status '  + err.status , 'No existe un error definido', 'error');
       } else {
        swal('Error Status '  + err.status ,  err.error.mensaje, 'error');
    }
      }
    return throwError(err.error.mensaje);
  }



  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      // tslint:disable-next-line: arrow-return-shorthand
      .pipe(map((resp: any) => {
        swal('Usuario creado', resp.usuario.email, 'success');
      }),
      catchError(err =>  { 
        console.log (err.error.errors.message);
        return this.manejarError(err, err.error.errors.message); })
      );
  }

   actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }),
      catchError(err => this.manejarError(err, null))
      );

  }


  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      });

  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url).pipe(
      map( (resp: any) => resp) ,
      catchError(err => this.manejarError(err, null)) );
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
      map( (resp: any) => resp) ,
      catchError(err => this.manejarError(err, null)) );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal('Usuario borrado', 'El usuraio fue borrado ', 'success');
        return true;
      }));
  }
}
