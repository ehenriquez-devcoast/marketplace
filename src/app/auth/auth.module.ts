import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './routes/login/login.component';
import { IndexComponent } from './routes/index/index.component';


@NgModule({
  declarations: [LoginComponent, IndexComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
