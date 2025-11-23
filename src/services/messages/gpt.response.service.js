import requester from "@/shared/axios/requester.service.js";
import Response from "@/shared/data/response.class.js";
import {HttpStatusCode} from "axios";
export default async function getGPTResponse(patientId) {
    try {
        const response = await requester.get(`patients/${patientId}/messages/gpt-response/`);
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
                            "Error interno del servidor al generar la respuesta de GPT"
                            : "No se pudo establecer comunicación con el servidor"
        )
    }
}