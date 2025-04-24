import Swal from "sweetalert2"

export const SwalCarrito = () => {
   
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto agregado al carrito",
            showConfirmButton: false,
            timer: 1500
          });
    
}

