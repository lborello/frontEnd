import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
    console.log('pages.componentN INIT');
  }

}
