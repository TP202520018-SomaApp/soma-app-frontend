const db = require('../sequelize.cjs');


module.exports = {
    async findAllByDoctorId(doctor_id) {
        return await db.DoctorRooms.findAll({ where: { doctor_id } });
    },
    async findById(id) {
        return await db.DoctorRooms.findByPk(id);
    },
    async create(doctor_id, name, address) {
        return await db.DoctorRooms.create({ doctor_id, name, address });
    },
    async update(room_id, doctor_id, name, address, photo) {
        const room = await db.DoctorRooms.findByPk(room_id);
        if (!room) throw new Error('Habitación no encontrada');
        if (room.doctor_id !== doctor_id) throw new Error('No autorizado para actualizar esta habitación');

        room.name = name || room.name;
        room.address = address || room.address;
        room.photo = photo || room.photo;

        await room.save();
        return room;
    },
    async delete(room_id) {
        const room = await db.DoctorRooms.findByPk(room_id);
        if (!room) throw new Error('Habitación no encontrada');

        await room.destroy();
        return true;
    }
};