const db = require('../sequelize.cjs');


module.exports = {
    async findAll() { return await db.Allergies.findAll() },
    async findById(id) { return await db.Allergies.findByPk(id) },
    async findByCreatorId(creator_id) {
        return await db.Allergies.findAll({ where: { creator_id }, raw: true });
    },
    async create(creator_id, name, description) {
        return await db.Allergies.create({ creator_id, name, description });
    },
    async update(id, creator_id, name, description) {
        const allergy = await db.Allergies.findByPk(id);
        if (!allergy) { throw new Error('Allergy not found') }
        if (allergy.creator_id !== creator_id) { throw new Error('Allergy not yours') }
        allergy.name = name;
        allergy.description = description;
        return await allergy.save();
    },
    async findByIdList(idList){
        return await db.Allergies.findAll({ where: { id: idList }, raw: true })
    }
};