const repository = require('../../infrastructure/repositories/predictions.repository.cjs');
const patientRepository = require('../../infrastructure/repositories/user.repository.cjs');
const riskPerPatientRepository = require('../../infrastructure/repositories/risks.per.patient.repository.cjs');
const {predictRecurrence} = require("../../infrastructure/random.forest/random.forest.cjs");
module.exports = {
    async create(req, res) {
        try {
            let { patientId } = req.body;
            if(!patientId || isNaN(Number(patientId)))
                return res.status(400).json({ error: "Id de paciente inválido" });

            const patient = await patientRepository.findById(patientId)
            const risk = await riskPerPatientRepository.getTotalRiskPerPatient(patientId);

            const prediction = await predictRecurrence({
                patient_id: Number(patientId),
                age: patient.birthdate ? Math.floor((new Date() - new Date(patient.birthdate).getTime()) /
                    (365.25 * 24 * 60 * 60 * 1000) ) : 50,
                weight: patient.weight || 70,
                height: patient.height || 1.7,
                risk: risk || 0,

                tumor_size: req.body.tumor_size || 20,
                lymph_node_count: req.body.lymph_node_count || 2,
                metastasis: req.body.metastasis || 0,
                ca15_3_marker: req.body.ca15_3_marker || 30,
                chemotherapy: req.body.chemotherapy || 1,
                chemo_cycles: req.body.chemo_cycles || 6,
                radiotherapy: req.body.radiotherapy || 1,
                surgery: req.body.surgery || 1,
                margin: req.body.margin || 1,

                last_appointment_date: req.body.last_appointment_date?
                    new Date(req.body.last_appointment_date) : new Date(),
                dates_count: req.body.dates_count || 5,
                symptoms: req.body.symptoms || 2
            })
            const saved = await repository.create(prediction);
            res.status(201).json(saved);
        } catch (err) { res.status(500).json({ error: err.message }) }
    },

    async findByPatientId(req, res) {
        try {
            const { patientId } = req.params;
            if(!patientId || isNaN(Number(patientId)))
                return res.status(400).json({ error: "Id de paciente inválido" });
            const predictions = await repository.findByPatientId(Number(patientId));
            res.status(200).json(predictions);
        } catch (err) { res.status(500).json({ error: err.message }) }
    },
};