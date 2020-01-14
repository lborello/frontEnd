import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  ExcelService ,
  LoginGuardGuard,
  AdminGuard,
  VerificaTokenGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService
 } from './service.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    // Servicio de paginas de mantenimiento
    UsuarioService,
    HospitalService,
    MedicoService,
    ExcelService,
    // Fin de servicios de paginas de mantenimiento
  //  Guards
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
  // Fin  Guards
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: [
   ]
})
export class ServiceModule { }
