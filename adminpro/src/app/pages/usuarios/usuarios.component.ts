import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
// import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  // CommonJS
  // Swal = require('sweetalert2');
  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(
      resp => this.cargarUsuarios()
    );
  }

  cargarUsuarios() {
    console.log(this.desde);
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });

  }
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;


    if (desde >= this.totalRegistros) {
      console.log('this.totalRegistros');
      // return;
    }
    if (desde <= 0) {
      valor = 0;
      this.desde = 0;
      // return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }
  guardarUsuario(usuario: Usuario) {
    console.log(usuario);

    this._usuarioService.actualizarUsuario(usuario)
      .subscribe((dato) => {
        console.log(dato);
        this.cargarUsuarios();
          });

  }
  borrarUsuario(usuario: Usuario) {

    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-check" aria-hidden="true"></i> Borrar',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-ban" aria-hidden="true"></i> Cancelar',
      // cancelButtonAriaLabel: 'Thumbs down'
    }).then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe(borrado => {
            console.log(borrado);
            this.cargarUsuarios();
          });
      }

    });

  }


  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
    } else {
      console.log(termino);
      this._usuarioService.buscarUsuarios(termino)
        .subscribe((usuariosDB: any) => {
          this.totalRegistros = usuariosDB.usuarios.length;
          this.usuarios = usuariosDB.usuarios;
          console.log(usuariosDB);
          // this.cargando = false;
        });
    }
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
   }
}
