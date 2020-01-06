import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ServiceModule } from '../../services/service.module';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
        // console.log(id);
      } else {
        // console.log(id);

      }

    });

  }

  ngOnInit() {

    this._hospitalService.cargarHospitales()
          .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            console.log(resp);
            console.log(resp.medico.img);


            this.medico.img = resp.medico.img;

          });

  }

  evento(evento) {
console.log (evento);

  }
  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
          .subscribe( medico => {

            // console.log( medico );
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital( this.medico.hospital );
          });
  }

  guardarMedico( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
            .subscribe( medico => {

              this.medico._id = medico._id;

              this.router.navigate(['/medico', medico._id ]);

            });

  }

  cambioHospital( id: string ) {

    this._hospitalService.obtenerHospital( id )
          .subscribe( hospital => this.hospital = hospital );

  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );

  }


}

