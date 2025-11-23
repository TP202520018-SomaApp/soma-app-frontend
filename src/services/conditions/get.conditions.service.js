import axios from '@/shared/axios/requester.service.js';
import Response from '@/shared/data/response.class.js';
import { HttpStatusCode } from 'axios';
export default async function getConditions() {
    try {
        const response = await axios.get('conditions');
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error:
            error.response?.status === HttpStatusCode.InternalServerError ?
                "Error interno del servidor al obtener la lista de condiciones médicas"
                : "No se pudo establecer comunicación con el servidor"
        );
    }
}