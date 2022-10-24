
import Swal, { SweetAlertOptions } from 'sweetalert2';


export const dialogActions = (callback: any, message: string) => {
  Swal.fire({
    title: 'Are you sure?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes ',
    // width: 470,
    // heightAuto: 300
  } as SweetAlertOptions).then((result) => {
    if (result.isConfirmed) {
      callback();

    }
  })

}

