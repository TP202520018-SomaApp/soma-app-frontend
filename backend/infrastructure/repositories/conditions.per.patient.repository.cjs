const db = require('../sequelize.cjs');


module.exports = {
    async findById(id) {
        return await db.ConditionsPerPatient.findByPk(id);
    },
    async findByConditionId(condition_id) {
        return await db.ConditionsPerPatient.findAll({ where: { condition_id } });
    },
    async findByPatientId(patient_id) {
        return await db.ConditionsPerPatient.findAll({ where: { patient_id } });
    },
    async create(patient_id, condition_id) {
        return await db.ConditionsPerPatient.create({ patient_id, condition_id });
    },
    async delete(patient_id, condition_id) {
        return await db.ConditionsPerPatient.destroy({ where: { patient_id, condition_id } });
    }
};