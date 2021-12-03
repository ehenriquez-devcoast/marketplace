import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetalertService {
  constructor() {}

  successMessage(_title: string, _description: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: _title,
      text: _description,
      showConfirmButton: false,
      timer: 4000,
    });
  }

  errorMessage(_title: string, _description: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: _title,
      text: _description,
      showConfirmButton: false,
      timer: 5000,
    });
  }
}
