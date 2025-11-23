import axios from "@/shared/axios/requester.service.js";
import Response from "@/shared/data/response.class.js";
import {HttpStatusCode} from "axios";

export default async function createRoom(doctorId, room) {
    try {
        const response = await axios.post(`doctors/${doctorId}/rooms`, room);
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error:
            error.response?.status === HttpStatusCode.BadRequest ?
            "Datos inválidos enviados en la solicitud de creacion del consultorio":
            error.response?.status === HttpStatusCode.InternalServerError ?
            "Error interno del servidor al crear el consultorio":
            "No se pudo establecer comunicación con el servidor"
        );
    }
}