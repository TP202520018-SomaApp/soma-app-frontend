const db = require('../sequelize.cjs');
module.exports = {
    async findByEmail(email) {
        const users = await db.Users.findAll({ where: { email } })
        if(users.length === 0) return null;
        return users[0];
    },
    async findByDNI(dni_ce) {
        const users = await db.Users.findAll({ where: { dni_ce } });
        if(users.length === 0) return null;
        return users[0];
    },
    async findByPhone(phone) {
        const users = await db.Users.findAll({ where: { phone } });
        if(users.length === 0) return null;
        return users[0];
    },
    async findByUsername(username, includeInactive = false) {
        const users = await db.Users.findAll({
            where: includeInactive ? { active: true, username } : { username }
        });

        if(users.length === 0) return null;
        return users[0];
    },
    async findByToken(token) {
        const users = await db.Users.findAll({ where: { token } });
        if(users.length === 0) return null;
        return users[0];
    },
    async findById(id) { return db.Users.findByPk(id) },
    async findByIdList(idList) { return db.Users.findAll({ where: { id: idList } }) },
    async createUser(user) { return db.Users.create(user) },
    async updateUser(user) {
        const existingUser = await db.Users.findByPk(user.id);
        if (!existingUser) { throw new Error('Usuario no encontrado') }
        return await existingUser.update(user);
    }
};