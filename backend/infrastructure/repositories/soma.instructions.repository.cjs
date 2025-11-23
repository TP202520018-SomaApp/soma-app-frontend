const db = require('../sequelize.cjs');


module.exports = {
    async findById(id) {
        return await db.SomaInstructions.findByPk(id);
    },
    async findAllByDoctorId(doctor_id) {
        return await db.SomaInstructions.findAll({ where: { doctor_id } });
    },
    async findActiveByDoctorId(doctor_id) {
        return await db.SomaInstructions.findAll({ where: { doctor_id, active: true } });
    },
    async createInstruction(doctor_id, title, content) {
        return await db.SomaInstructions.create({ doctor_id, title, content, active: true });
    },
    async updateInstruction(id, title, content, active) {
        const instruction = await db.SomaInstructions.findByPk(id);
        if (!instruction) { throw new Error('Instruction not found'); }
        if(title) instruction.title = title;
        if(content) instruction.content = content;
        instruction.active = active;
        return await instruction.save();
    },
    async deleteInstruction(id) {
        const instruction = await db.SomaInstructions.findByPk(id);
        if (!instruction) { throw new Error('Instruction not found'); }
        return await instruction.destroy();
    }
};