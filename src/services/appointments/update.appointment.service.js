import requester from "@/shared/axios/requester.service.js";
import Response from "@/shared/data/response.class.js";
import {HttpStatusCode} from "axios";
export default async function updateAppointment(patientId, doctorId, notification) {
    try {
        const response = await requester.put(
                  !doctorId?`patients/${patientId}/appointments/${notification.id}`:
            `doctors/${doctorId}/patients/${patientId}/appointments/${notification.id}`,
            notification);
        return new Response(response.data);
    } catch (error) {
        console.error(error);
        return new Response(null,
            error.response?.data?.error ? error.response.data.error
            : error.response?.status === HttpStatusCode.Unauthorized ?
            "El token de acceso proporcionado es inválido"
            : error.response?.status === HttpStatusCode.NotFound ?
            "No se pudo encontrar al paciente"
            : error.response?.status === HttpStatusCode.InternalServerError ?
            "Error interno del servidor al actualizar la cita"
            : "No se pudo establecer comunicación con el servidor"
        )
    }
}