import requester from "@/shared/axios/requester.service.js";
import Response from "@/shared/data/response.class.js";
import {HttpStatusCode} from "axios";

export default async function getSpecialities() {
    try {
        const response = await requester.get('/specialities');
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error
                : error.response?.status === HttpStatusCode.Unauthorized ?
                    "El token de acceso proporcionado es inválido"
                    : error.response?.status === HttpStatusCode.NotFound ?
                        "El sistema de especialidades se encuentra temporalmente en mantenimiento"
                        : error.response?.status === HttpStatusCode.InternalServerError ?
                            "Error interno del servidor al obtener las especialidades"
                            : "No se pudo establecer comunicación con el servidor"
        );
    }
}