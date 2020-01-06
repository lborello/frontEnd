import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';







import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
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
    // Fin de servicios de paginas de mantenimiento
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: [
   ]
})
export class ServiceModule { }
