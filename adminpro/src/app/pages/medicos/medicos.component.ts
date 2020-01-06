import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
medicos: Medico [] = [] ;
  // tslint:disable-next-line: variable-name
  constructor(public _medicoService: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos();
  }
  cargarMedicos() {

    this._medicoService.cargarMedicos()
    .subscribe( (medicos) => { this.medicos = medicos; });
  }

  buscarMedico(termino: string) {
if (termino.length <= 0) {
  this.cargarMedicos();
} else {
  this._medicoService.buscarMedicos(termino)
  .subscribe( (medicos) => { this.medicos = medicos; });
}

}
  borrarMedico( medico: Medico ) {
    this._medicoService.borrarMedicos(medico._id)
  .subscribe( (resp: any) => {
         console.log(resp);
         this.cargarMedicos();
   });
  }
}
