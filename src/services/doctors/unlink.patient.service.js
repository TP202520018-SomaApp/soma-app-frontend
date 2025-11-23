/*
routes:
router.get('/doctors/:id/allergies', alleCtrl.findAllByCreatorId);
router.get('/doctors/:id/conditions', condCtrl.findAllByCreatorId);
router.post('/doctors/:doctorId/patients/:patientId', pPDCtrl.linkPatientToDoctor);
router.delete('/doctors/:doctorId/patients/:patientId', pPDCtrl.unlinkPatientFromDoctor);
router.get('/doctors/:id/patients', pPDCtrl.getPatientsPerDoctor);
router.get('/patients/:id/doctors', pPDCtrl.getDoctorsPerPatient);
*/

import requester from "@/shared/axios/requester.service.js";
import Response from "@/shared/data/response.class.js";
import {HttpStatusCode} from "axios";
export default async function unlinkPatientFromDoctor(doctorId, patientId) {
    try {
        const response = await requester.delete(`doctors/${doctorId}/patients/${patientId}`);
        return new Response(response.data);
    } catch (error) {
        return new Response(null,
            error.response?.data?.error ? error.response.data.error
            : error.response?.status === HttpStatusCode.Unauthorized ?
            "El token de acceso proporcionado es inválido"
            : error.response?.status === HttpStatusCode.NotFound ?
            "No se encontró el paciente a desvincular"
            : error.response?.status === HttpStatusCode.InternalServerError ?
            "Error interno del servidor al desvincular el paciente"
            : "No se pudo establecer comunicación con el servidor"
        );
    }
}
