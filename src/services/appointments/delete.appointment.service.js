import requester from "@/shared/axios/requester.service.js";
import Response from "@/shared/data/response.class.js";
import {HttpStatusCode} from "axios";

export default async function deleteAppointment(patientId, doctorId, appointmentId) {
    try {
        const response = await requester.delete(
                  !doctorId?`patients/${patientId}/appointments/${appointmentId}`:
            `doctors/${doctorId}/patients/${patientId}/appointments/${appointmentId}`);
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error
            : error.response?.status === HttpStatusCode.Unauthorized ?
            "El token de acceso proporcionado es inválido"
            : error.response?.status === HttpStatusCode.NotFound ?
            "El sistema de citas se encuentra temporalmente en mantenimiento"
            : error.response?.status === HttpStatusCode.InternalServerError ?
            "Error interno del servidor al eliminar la notificación"
            : "No se pudo establecer comunicación con el servidor"
        );
    }
}