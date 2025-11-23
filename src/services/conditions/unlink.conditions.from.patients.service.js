import axios from '@/shared/axios/requester.service.js';
import Response from '@/shared/data/response.class.js';
import { HttpStatusCode } from 'axios';
export default async function unlinkConditionsToPatients(patientId, conditionId) {
    try {
        const response = await axios.delete(`patients/${patientId}/conditions/${conditionId}`);
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error
            : error.response?.status === HttpStatusCode.InternalServerError ?
            "Error interno del servidor al desvincular la condición médica al paciente"
            : "No se pudo establecer comunicación con el servidor"
        );
    }
}