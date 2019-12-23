import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
// Rutas
import { APP_ROUTES } from './app.routes';
// Servicios
import { SettingsService } from './services/settings.service';
// Modulos
import { PagesModule } from './pages/pages.module';
// ChartsModule
import { ChartsModule } from 'ng2-charts';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    // ,
    // GraficoDonaComponent
      ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ChartsModule
    ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
