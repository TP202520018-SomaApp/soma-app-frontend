const db = require('../sequelize.cjs');


module.exports = {
    async findByPatientId(patient_id) {
        return await db.Predictions.findAll({ where: patient_id, raw: true });
    },
    async create(predictionData) { return db.Predictions.create(predictionData) }
};