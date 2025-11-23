const db = require('../sequelize.cjs');
const logger = require('../../shared/utils/logger.util.cjs');
module.exports = {
    async findDoctorsByPatientId(patient_id) {
        const doctorIds = await db.PatientsPerDoctor.findAll(
            { where: { patient_id }, raw: true });
        const ids = doctorIds.map(record => record.doctor_id);
        return await db.Users.findAll({ where: { id: ids }, raw: true });
    },
    async findPatientsByDoctorId(doctor_id) {
        const patientIds = await db.PatientsPerDoctor.findAll(
            { where: { doctor_id }, raw: true });
        const ids = patientIds.map(record => record.patient_id);
        return await db.Users.findAll({ where: { id: ids }, raw: true });
    },

    async linkPatientToDoctor(patient_id, doctor_id) {
        try {
            const relation = await db.PatientsPerDoctor.findOrCreate(
                { where: { patient_id, doctor_id } })
            if (relation) return relation;
            else return false;
        } catch (error) {
            logger.error("Error unlinking patient from doctor:", error);
            return false;
        }
    },
    async unlinkPatientFromDoctor(patient_id, doctor_id) {
        try {
            const relation = await db.PatientsPerDoctor.findAll(
                { where: { patient_id, doctor_id } })
            if(relation && relation.length){
                relation[0].active = false;
                await relation[0].save();
                return true;
            }
            else return false;
        } catch (error) {
            logger.error("Error unlinking patient from doctor:", error);
            return false;
        }
    }
};