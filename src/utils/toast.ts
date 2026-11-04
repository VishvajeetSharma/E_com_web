import Swal from "sweetalert2";

/** Small bottom-right confirmation, styled by `.dd-home-toast` in home.css. */
export function homeToast(title: string, text?: string) {
  Swal.fire({
    toast: true,
    position: "bottom-end",
    title,
    text,
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    customClass: { popup: "dd-home-toast" },
  });
}
