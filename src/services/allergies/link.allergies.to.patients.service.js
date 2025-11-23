import axios from '@/shared/axios/requester.service.js';
import Response from '@/shared/data/response.class.js';
import { HttpStatusCode } from 'axios';
export default async function linkAllergiesToPatients(patientId, allergyId) {
    try {
        const response = await axios.post(`patients/${patientId}/allergies/${allergyId}`,
            { patientId, allergyId });
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error:
            error.response?.status === HttpStatusCode.InternalServerError ?
                "Error interno del servidor al vincular la alergia al paciente"
                : "No se pudo establecer comunicación con el servidor"
        );
    }
}