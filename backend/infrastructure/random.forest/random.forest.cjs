const fs = require("fs");
const { RandomForestRegression } = require("ml-random-forest");
const logger = require('../../shared/utils/logger.util.cjs');

// Cargar modelo
logger.log("🌲 Cargando modelo Random Forest...");
const modelData = JSON.parse(fs.readFileSync("./backend/rf.model.json", "utf8"));
const model = RandomForestRegression.load(modelData);
logger.log("🎄 Modelo cargado.");

// Entrada nueva (17 valores)
const mejorCaso = [
    18,   // edad - joven
    60,   // peso
    160,  // altura_cm
    0,    // peso_factores_riesgo - casi cero
    1,    // tamano_tumor - muy pequeño
    0,    // num_ganglios
    0,    // metastasis
    2.1,  // marcador - bajo
    0,    // quimioterapia
    0,    // ciclos_quimio
    0,    // radioterapia
    0,    // cirugia
    0,    // margen limpio
    0,    // meses_sin_control - muy reciente
    12,   // num_citas - muchos controles
    0,    // sintomas - nada
    0     // falta_controles
];
const peorCaso = [
    80,   // edad - avanzada
    150,  // peso
    150,  // altura_cm
    255,  // peso_factores_riesgo - máximo
    78,   // tamano_tumor - enorme
    9,    // num_ganglios
    1,    // metastasis
    35.0, // marcador - muy alto
    1,    // quimioterapia
    7,    // ciclos_quimio
    1,    // radioterapia
    1,    // cirugia
    1,    // margen comprometido
    23,   // meses_sin_control
    0,    // num_citas - no se controla
    3,    // sintomas severos
    1     // falta_controles
];
const casoPromedio = [
    48,   // edad
    74,   // peso
    162,  // altura_cm
    120,  // peso_factores_riesgo - riesgo medio
    32,   // tamano_tumor
    2,    // num_ganglios
    0,    // metastasis
    10.0, // marcador
    1,    // quimioterapia
    3,    // ciclos_quimio
    1,    // radioterapia
    1,    // cirugia
    0,    // margen limpio
    6,    // meses_sin_control
    4,    // num_citas
    1,    // sintomas leves
    0     // falta_controles
];

// Predecir regresión (valor continuo)
logger.log("🥱 Generando predicciones para casos de prueba");
logger.log("📉 Positivo:", model.predict([mejorCaso])[0].toFixed(2)*100, "%");
logger.log("📊 Promedio:", model.predict([casoPromedio])[0].toFixed(2)*100, "%");
logger.log("📈 Negativo:", model.predict([peorCaso])[0].toFixed(2)*100, "%");

module.exports = {
    /*
    * Predice el riesgo de recaída basado en las características del paciente.
    * @param {Object} params - Parámetros del paciente.
    * @param {string} params.patient_id - ID del paciente.
    * @param {number} params.age - Edad del paciente.
    * @param {number} params.weight - Peso del paciente en kg.
    * @param {number} params.height - Altura del paciente en m.
    * @param {number} params.risk - Peso de factores de riesgo. 0 a 255.
    * @param {number} params.tumor_size - Tamaño del tumor.
    * @param {number} params.lymph_node_count - Número de ganglios afectados.
    * @param {number} params.metastasis - Presencia de metástasis (0 o 1).
    * @param {number} params.ca15_3_marker - Nivel del marcador CA15-3.
    * @param {number} params.chemotherapy - Si ha recibido quimioterapia (0 o 1).
    * @param {number} params.chemo_cycles - Número de ciclos de quimioterapia.
    * @param {number} params.radiotherapy - Si ha recibido radioterapia (0 o 1).
    * @param {number} params.surgery - Si ha sido sometido a cirugía (0 o 1).
    * @param {number} params.margin - Estado del margen quirúrgico (0 o 1).
    * @param {string} params.last_appointment_date - Fecha de la última cita (ISO string).
    * @param {number} params.dates_count - Número de citas médicas.
    * @param {number} params.symptoms - Número de síntomas presentes.
    * @returns {Object} Resultado con patient_id, input_data y risk_score.
    */
    predictRecurrence({ patient_id, age, weight, height, risk,
                          tumor_size, lymph_node_count, metastasis, ca15_3_marker,
                          chemotherapy, chemo_cycles, radiotherapy, surgery, margin,
                          last_appointment_date, dates_count, symptoms }) {
        const noControl= (Date.now() - new Date(last_appointment_date)) / (1000 * 60 * 60 * 24 * 30)
        const input = [
            +age,
            +Math.round(weight), // redondear peso
            +height*100, // convertir m a cm
            +risk,
            +tumor_size,
            +lymph_node_count,
            +metastasis,
            +ca15_3_marker,
            +chemotherapy,
            +chemo_cycles,
            +radiotherapy,
            +surgery,
            +margin,
            +noControl, // meses_sin_control
            +dates_count,
            +symptoms,
            +(noControl > 6 ? 1 : 0) // falta_controles
        ];
        return {
            patient_id,
            input_data: JSON.stringify(input),
            risk_score: model.predict([input])[0]
        }; // valor entre 0.01 y 1.00
    }
}