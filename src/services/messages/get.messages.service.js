import requester from "@/shared/axios/requester.service.js";
import Response from "@/shared/data/response.class.js";
import {HttpStatusCode} from "axios";

export default async function getPatientMessages(patientId, doctorId) {
    try {
        const response = await requester.get(!doctorId?`patients/${patientId}/messages/`:
            `doctors/${doctorId}/patients/${patientId}/messages/`);
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error
            : error.response?.status === HttpStatusCode.Unauthorized ?
            "El token de acceso proporcionado es inválido"
            : error.response?.status === HttpStatusCode.NotFound ?
            "El sistema de mensajería se encuentra temporalmente en mantenimiento"
            : error.response?.status === HttpStatusCode.InternalServerError ?
            "Error interno del servidor al obtener los mensajes"
            : "No se pudo establecer comunicación con el servidor"
        );
    }
}