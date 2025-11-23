const db = require('../sequelize.cjs');


module.exports = {
    async findById(id) {  return await db.RiskFactorsPerPatient.findByPk(id) },
    async findByPatientId(patient_id) {
        return await db.RiskFactorsPerPatient.findAll({ where: { patient_id }, raw: true });
    },
    async findByRiskId(risk_factor_id) {
        return await db.RiskFactorsPerPatient.findAll({ where: { risk_factor_id }, raw: true });
    },
    async getTotalRiskPerPatient(patient_id) {
        const rows = await db.RiskFactorsPerPatient.findAll({
            where: { patient_id }, raw: true,
            include: [{ model: db.RiskFactors, as: 'risk', attributes: ['risk'] }],
        });
        // Sumatoria de riesgos
        return rows.reduce((t, r) => t + r.risk.risk, 0);
    },
    async create(patient_id, risk_factor_id) {
        return await db.RiskFactorsPerPatient.create({ patient_id, risk_factor_id });
    },
    async delete(risk_factor_id, patient_id) {
        console.log(risk_factor_id, patient_id);
        const riskPerPatient = await db.RiskFactorsPerPatient.findOne({
            where: { risk_factor_id, patient_id }
        });
        if (!riskPerPatient) { throw new Error('Este riesgo no está vinculado al paciente en la base de datos') }
        return await riskPerPatient.destroy();
    }
};