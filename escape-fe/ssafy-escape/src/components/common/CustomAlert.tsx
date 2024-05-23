import Swal, { SweetAlertOptions } from "sweetalert2"

const CustomAlert = (options: SweetAlertOptions) => {
  Swal.fire({
    width: "500px",
    padding: "40px",
    ...options,
  })
}

export default CustomAlert
