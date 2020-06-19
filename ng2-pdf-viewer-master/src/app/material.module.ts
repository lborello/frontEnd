import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule
  ]
})
export class DemoMaterialModule {}
