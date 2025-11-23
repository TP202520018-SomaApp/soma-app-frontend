const db = require('../sequelize.cjs');
const {removeSensitiveInfo} = require('../../shared/utils/user.utils.cjs');

module.exports = {
    async findByPatientId(patient_id) {
        return (await db.Messages.findAll({ where: { patient_id } }))
            .sort((a, b) => a.date - b.date);

    },
    async create(patient_id, doctor_id, from_patient, text) {
        if(!doctor_id) doctor_id = null;
        const date = new Date();
        return db.Messages.create({ patient_id, doctor_id, from_patient, text, date});
    },
    async setTextMessage(id, text) {
        const date = new Date();
        const message = await db.Messages.findByPk(id);
        if (!message) { throw new Error('Message not found') }
        message.text = text;
        message.date = date;
        return await message.save();
    },
    async setDoctorNote(id, doctor_note) {
        const message = await db.Messages.findByPk(id);
        if (!message) { throw new Error('Message not found') }
        message.doctor_note = doctor_note;
        return await message.save();
    },
    async setReadStatus(id, read) {
        const message = await db.Messages.findByPk(id);
        if (!message) { throw new Error('Message not found') }
        message.read = read;
        return await message.save();
    },
};