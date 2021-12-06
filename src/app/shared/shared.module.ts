import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';

//// Formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';

// ngx-boostrap-Modal
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,

    SharedRoutingModule,
  ],
  exports: [FormsModule, ModalModule, ReactiveFormsModule, NavbarComponent],
})
export class SharedModule {}
