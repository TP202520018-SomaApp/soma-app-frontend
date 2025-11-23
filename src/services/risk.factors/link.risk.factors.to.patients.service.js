import axios from '@/shared/axios/requester.service.js';
import Response from '@/shared/data/response.class.js';
import { HttpStatusCode } from 'axios';
export default async function linkRiskFactorsToPatients(patientId, riskId) {
    try {
        const response = await axios.post(`patients/${patientId}/risks/${riskId}`,
            { patientId, riskId });
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error:
            error.response?.status === HttpStatusCode.InternalServerError ?
                "Error interno del servidor al vincular el riesgo al paciente"
                : "No se pudo establecer comunicación con el servidor"
        );
    }
}