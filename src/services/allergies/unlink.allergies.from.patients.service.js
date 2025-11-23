import axios from '@/shared/axios/requester.service.js';
import Response from '@/shared/data/response.class.js';
import { HttpStatusCode } from 'axios';
export default async function unlinkAllergiesFromPatients(patientId, allergyId) {
    try {
        const response = await axios.delete(`patients/${patientId}/allergies/${allergyId}`);
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error:
            error.response?.status === HttpStatusCode.InternalServerError ?
                "Error interno del servidor al desvincular la alergia del paciente"
                : "No se pudo establecer comunicación con el servidor"
        );
    }
}