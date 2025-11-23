import axios from "@/shared/axios/requester.service.js";
import Response from "@/shared/data/response.class.js";
import {HttpStatusCode} from "axios";

export default async function deleteRoom(doctorId, room) {
    try {
        const response = await axios.delete(`doctors/${doctorId}/rooms/${room.id}`);
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error:
            error.response?.status === HttpStatusCode.BadRequest ?
            "Datos inválidos enviados en la solicitud de eliminacion del consultorio":
            error.response?.status === HttpStatusCode.InternalServerError ?
            "Error interno del servidor al eliminar el consultorio":
            "No se pudo establecer comunicación con el servidor"
        );
    }
}