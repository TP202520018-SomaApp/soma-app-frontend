const db = require('../sequelize.cjs');


module.exports = {
    async findAll() {
        return await db.MedicalConditions.findAll();
    },
    async findById(id) {
        return await db.MedicalConditions.findByPk(id);
    },
    async findByCreatorId(creator_id) {
        return await db.MedicalConditions.findAll({ where: { creator_id } });
    },
    async create(creator_id, name, description) {
        return await db.MedicalConditions.create({ creator_id, name, description });
    },
    async update(id, creator_id, name, description) {
        const condition = await db.MedicalConditions.findByPk(id);
        if (!condition) { throw new Error('Condition not found') }
        if (condition.creator_id !== creator_id) { throw new Error('Condition not yours') }
        condition.name = name;
        condition.description = description;
        return await condition.save();
    },
    async findByIdList(idList){
        return await db.MedicalConditions.findAll({ where: { id: idList } });
    }
};