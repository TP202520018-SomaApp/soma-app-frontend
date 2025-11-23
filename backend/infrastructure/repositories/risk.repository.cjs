const db = require('../sequelize.cjs');
module.exports = {
    async findAll() { return await db.RiskFactors.findAll() },
    async findById(id) { return await db.RiskFactors.findByPk(id) },
    async findByCreatorId(creator_id) {
        return await db.RiskFactors.findAll({ where: { creator_id }, raw: true });
    },
    async create(creator_id, name, description, risk) {
        return await db.RiskFactors.create({ creator_id, name, description, risk });
    },
    async update(id, creator_id, name, description, risk) {
        const rf = await db.RiskFactors.findByPk(id);
        if (!rf) { throw new Error('Allergy not found') }
        if (rf.creator_id !== creator_id) { throw new Error('Allergy not yours') }
        rf.name = name;
        rf.description = description;
        rf.risk = risk;
        return await rf.save();
    },
    async findByIdList(idList){
        return await db.RiskFactors.findAll({ where: { id: idList }, raw: true })
    }
};