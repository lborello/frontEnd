import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;


  constructor(
    public http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService) { }

  cargarMedicos() {
    // console.log(  this._usuarioService.token);
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      }));
  }

  cargarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url ).pipe( map( (resp: any) =>
     { 
      //  console.log(resp.medicos);
      return resp.medicos ;       }  ));

  }

obtenerMedicosl( id: string ) {
  console.log('token' + this._usuarioService.token);

  const url = URL_SERVICIOS + '/medicos/' + id;
  return this.http.get( url ).pipe(
                map( (resp: Medico) => resp ));

  }

  borrarMedicos( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    console.log (url);
    return this.http.delete( url )
    .pipe(
                map( resp => swal('Medico Borrado'  , 'Eliminado correctamente', 'success') ));

  }

  crearMedico( nombre: string ) {

    let url = URL_SERVICIOS + '/medico';
    url += '?token=' + this._usuarioService.token;
    console.log(this._usuarioService.token);


    return this.http.post( url, { nombre } ).pipe (
              map( (resp: any) => resp.hospital ));

  }

  buscarMedicos( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url ).pipe(
                map( (resp: any) => resp.medicos ));

  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, medico ).pipe (map( (resp: any) => {
        swal('Médico Actualizado', medico.nombre, 'success');
        return resp.medico;

      }) ) ;
    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, medico ).pipe( map( (resp: any) => {
        swal('Médico Creado', medico.nombre, 'success');
        return resp.medico;
      }) ) ;

    }




  }

//   actualizarHospital( hospital: Hospital ) {

//     let url = URL_SERVICIOS + '/hospital/' + hospital._id;
//     url += '?token=' + this._usuarioService.token;

//     return this.http.put( url, hospital ).pipe(
//               map( (resp: any) => {

//                 swal('Hospital Actualiado', hospital.nombre, 'success');
//                 return resp.hospital;
//               }));

//   }

// }


}
