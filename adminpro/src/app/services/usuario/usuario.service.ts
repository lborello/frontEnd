import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Router } from '@angular/router';



// import 'rxjs/add/operator/map';

// import 'rxjs/add/operator/map'
// Or more generally:
// import 'rxjs/Rx';


// import { map } from 'rxjs/operators';


@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient,
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _subirArchivoService: SubirArchivoService) {
    // console.log('Servicio de usuario listo :)');
    this.cargarStorage();
  }
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }
  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }



  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));


  }

  login(usuario: Usuario, recordar: boolean) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      // tslint:disable-next-line: arrow-return-shorthand
      .pipe(map((resp: any) => {
        swal('Usuario creado', resp.usuario.email, 'success');
      }));
  }

  // actualizarUsuario(usuario: Usuario) {
  //   let url = URL_SERVICIOS + '/usuario/' + usuario._id;
  //   url += '?token=' + this.token;
  //   return this.http.put(url, usuario)
  //     // tslint:disable-next-line: arrow-return-shorthand
  //     .pipe(map((resp: any) => {
  //       // console.log(resp);
  //       const usuarioDB: Usuario = resp.usuario;
  //       this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
  //       swal('Usuario Actualizado', resp.usuario.email, 'success');
  //       return true;
  //     }));
  // }


  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
                map((resp: any) => {

      if (usuario._id === this.usuario._id) {
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
      }

      swal('Usuario actualizado', usuario.nombre, 'success');

      return true;
    }));

  }


  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log(resp);
      });

  }
  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    // url += '?token=' + this.token;
    // return this.http.get(url, usuario);
    return this.http.get(url);
    // // tslint:disable-next-line: arrow-return-shorthand
    // .pipe(map((resp: any) => {
    //   // console.log(resp);
    //   const usuarioDB: Usuario = resp.usuario;
    //   this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
    //   swal('Usuario Actualizado', resp.usuario.email, 'success');
    //   return true;
    // }));
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url);
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
