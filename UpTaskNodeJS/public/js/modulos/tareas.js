import axios from "axios";
import Swal from 'sweetalert2';

import { actualizarAvance } from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {

    tareas.addEventListener('click', e => {
        // console.log(e.target.classList);
        if (e.target.classList.contains('fa-check-circle')) { // detecta el evento de cambio de completado
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea })
                .then(function(respuesta) {
                    if (respuesta.status === 200) {
                        icono.classList.toggle('completo');

                        actualizarAvance();
                    }
                });
        }

        if (e.target.classList.contains('fa-trash')) { // detecta el evento de borradp

            const tareaHTML = e.target.parentElement.parentElement,

                idTarea = tareaHTML.dataset.tarea;
            console.log(tareaHTML);

            Swal.fire({
                title: 'Deseas borrar esta Tarea?',
                text: "Una tarea eliminada no se puede recuperar",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/tareas/${idTarea}`;

                    // enviar el delete por medio axios
                    axios.delete(url, {  params: { idTarea } })
                        .then(function(respuesta) {
                            if (respuesta.status === 200) {
                                // console.log(respuesta);

                                // Eliminar el Nodo
                                console.log(tareaHTML.parentElement.parentElement);
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                // Opcional una alerta
                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                )

                                actualizarAvance();
                            }
                        });
                }
            })
        }
    });

}

export default tareas;