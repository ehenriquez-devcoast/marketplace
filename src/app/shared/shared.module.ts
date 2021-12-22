import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';

//// Formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';

// ngx-boostrap-Modal
import { ModalModule } from 'ngx-bootstrap/modal';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [NavbarComponent, LoadingComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    SharedRoutingModule,
  ],
  exports: [
    FormsModule,
    ModalModule,
    BsDropdownModule,
    ReactiveFormsModule,
    LoadingComponent,
    NavbarComponent,
  ],
})
export class SharedModule {}
