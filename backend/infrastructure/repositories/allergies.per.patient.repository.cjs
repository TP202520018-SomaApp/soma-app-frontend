const db = require('../sequelize.cjs');


module.exports = {
    async findById(id) {
        return await db.AllergiesPerPatient.findByPk(id);
    },
    async findByAllergyId(allergy_id) {
        return await db.AllergiesPerPatient.findAll({ where: { allergy_id } });
    },

    async findByPatientId(patient_id) {
        return await db.AllergiesPerPatient.findAll({ where: { patient_id } });
    },
    async create(patient_id, allergy_id) {
        return await db.AllergiesPerPatient.create({ patient_id, allergy_id });
    },
    async delete(allergy_id, patient_id) {
        const allergyPerPatient = await db.AllergiesPerPatient.findOne({ where: { allergy_id, patient_id } });
        if (!allergyPerPatient) { throw new Error('Allergy per patient not found') }
        return await allergyPerPatient.destroy();
    }
};