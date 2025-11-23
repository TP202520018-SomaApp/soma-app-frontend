const db = require('../sequelize.cjs');


module.exports = {
    async findAllByDoctorId(doctor_id) {
        return await db.Appointments.findAll({ where: { doctor_id }, raw: true });
    },
    async findAllByPatientId(patient_id) {
        return await db.Appointments.findAll({ where: { patient_id }, raw: true });
    },
    async findAllByPatientIdAndDoctorId(patient_id, doctor_id) {
        return await db.Appointments.findAll({ where: { patient_id, doctor_id }, raw: true });
    },
    async findAllByDoctorRoomId(doctor_room) {
        return await db.Appointments.findAll({ where: { doctor_room }, raw: true });
    },
    async findById(id) {
        return await db.Appointments.findByPk(id);
    },
    async create(doctor_id, patient_id, doctor_room, proposed_by, start, end, topic,
                 reason, status_id, method_id) {
        return await db.Appointments.create({
            doctor_id,
            patient_id,
            doctor_room: doctor_room || null,
            proposed_by,
            start,
            end,
            topic,
            reason,
            status_id,
            method_id: method_id || null,
        });
    },
    async update(id, room_id, start, end, topic, reason, status_id, method_id, attend) {
        const appointment = await db.Appointments.findByPk(id);
        if (appointment) {
            appointment.room_id = room_id || appointment.room_id;
            appointment.start = start || appointment.start;
            appointment.end = end || appointment.end;
            appointment.topic = topic || appointment.topic;
            appointment.reason = reason || appointment.reason;
            appointment.method_id = method_id || appointment.method_id;
            appointment.status_id = status_id || appointment.status_id;
            if (attend !== undefined) appointment.attend = attend;
            await appointment.save();
            return appointment;
        }
        throw new Error('Cita no encontrada');
    },
    async delete(id) {
        const appointment = await db.Appointments.findByPk(id);
        if (appointment) {
            await appointment.destroy();
            return true;
        }
        throw new Error('Cita no encontrada');
    }
};