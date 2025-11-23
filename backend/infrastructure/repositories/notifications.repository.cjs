const db = require('../sequelize.cjs');


module.exports = {
    async findByDoctorId(doctor_id) {
        return await db.Notifications.findAll({ where: { doctor_id } });
    },
    async findByPatientId(patient_id) {
        return await db.Notifications.findAll({ where: { patient_id } });
    },
    async findNotShownByPatientId(patient_id) {
        return await db.Notifications.findAll({ where: { patient_id, shown: false } });
    },
    async findByPatientIdAndDoctorId(patient_id, doctor_id) {
        return await db.Notifications.findAll({ where: { patient_id, doctor_id } });
    },
    async findById(id) {
        return await db.Notifications.findByPk(id);
    },
    async create(patient_id, doctor_id, summary, detail, severity_id) {
        return await db.Notifications.create({ patient_id, doctor_id, summary, detail, severity_id, shown: false });
    },
    async deleteForUser(id) {
        const notification = await db.Notifications.findByPk(id);
        if (!notification)  return false;

        notification.deleted = true;
        await notification.save();
        return true;
    },
    async delete(id) {
        const notification = await db.Notifications.findByPk(id);
        if (!notification) return false;
        await notification.destroy();
        return true;
    },
    async markAsShown(id) {
        const notification = await db.Notifications.findByPk(id);
        if (notification) {
            notification.shown = true;
            await notification.save();
        }
        return notification;
    },
    async update(id, summary, detail, severity_id) {
        const notification = await db.Notifications.findByPk(id);
        if (notification) {
            notification.summary = summary;
            notification.detail = detail;
            notification.severity_id = severity_id
            await notification.save();
        }
        return notification;
    }
};