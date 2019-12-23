import { Component , OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor( public _AJUSTES: SettingsService) { }

  ngOnInit () {
    console.log('app.component INIT');
  }

}
