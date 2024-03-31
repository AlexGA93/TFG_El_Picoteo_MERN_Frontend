import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AlertConfig } from 'src/types/types';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showAlert(alertConfig: AlertConfig): Promise<boolean> {
    return Swal.fire({
      title: alertConfig.title,
      icon: 'info',
      html: alertConfig.html,
      showCancelButton: alertConfig.showCancelButton,
    }).then((result) => {
      console.log(result);
      return result.isConfirmed;
    });
  }
}
