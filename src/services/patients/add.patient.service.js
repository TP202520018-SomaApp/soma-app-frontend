import requester from "@/shared/axios/requester.service.js";
import Response  from "@/shared/data/response.class.js";

/**
 * Crea un nuevo niño vinculado al padre que tiene la sesión abierta.
 * @param {Object} child {
 *   name: string,
 *   birthdate: string (YYYY-MM-DD),
 *   sex: "M" | "F",
 *   allergies: string[],
 *   intolerances: string[],
 *   medicalConditions: string[]
 * }
 */
export default async function addChild(child) {
    try {
        const res = await requester.post(`child`,child);
        return new Response(res.data);
    } catch (err) {
        return new Response(
            null,
            err.response?.data?.error ? err.response.data.error
            : err.response?.status === 400 ? "Datos del niño inválidos"
            : err.response?.status === 401 ? "Token inválido"
            : err.response?.status === 404 ? "Padre no encontrado"
            : err.response?.status === 500 ? "Error interno al crear el niño"
            : "No se pudo conectar con el servidor"
        );
    }
}