const repository = require('../../infrastructure/repositories/user.repository.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {HttpStatusCode} = require("axios");
const salt = Number(process.env.BCRYPT_SALT_ROUNDS);
const KEY = process.env.JWT_KEY;
const expiresIn = process.env.JWT_EXPIRES;
const logger = require('../../shared/utils/logger.util.cjs');
module.exports = {
    async registerUser(req, res) {
        try {
            const { username, email, dni_ce, password, phone } = req.body;
            const [exUser, exEmail, exDNI, exPhone] =
                await Promise.all([
                    repository.findByUsername(username),
                    repository.findByEmail(email),
                    repository.findByDNI(dni_ce),
                    repository.findByPhone(phone),
                ]);

            if (exUser) { return res.status(HttpStatusCode.Conflict).json({ error: 'Usuario ya registrado' }) }
            if (exEmail) { return  res.status(HttpStatusCode.Conflict).json({ error: 'Correo electrónico ya registrado' }) }
            if (exDNI) { return  res.status(HttpStatusCode.Conflict).json({ error: 'DNI/CEX ya registrado' }) }
            if (exPhone) { return  res.status(HttpStatusCode.Conflict).json({ error: 'Número de teléfono ya registrado' }) }

            const hash_password = await bcrypt.hash(password, salt);
            const newUser = await repository.createUser({ hash_password, ...req.body });
            res.status(HttpStatusCode.Created).json(newUser);
        } catch (err) {
            res.status(HttpStatusCode.InternalServerError).json({ error: err.message });
        }
    },

    async loginUser(req, res) {
        try {
            const { username, password} = req.body;
            const user = await repository.findByUsername(username);
            if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

            const valid = await bcrypt.compare(password, user.hash_password);
            if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' });
            user.token = jwt.sign({id: user.id, username: user.username}, KEY,{expiresIn});
            await repository.updateUser(user);

            //remove hash_password from response
            delete user.dataValues.hash_password;
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateUser(req, res) {
        try {
            let { userId } = req.params;
            const updates = req.body;

            userId = Number(userId)
            updates.id = userId;
            if (updates.password) {
                updates.hash_password = await bcrypt.hash(updates.password, salt);
                delete updates.password;
            }

            const validateUsername = await repository.findByUsername(updates.username, true);
            if (validateUsername && validateUsername.id !== userId)
                return res.status(HttpStatusCode.Conflict).json({ error: 'El nombre de usuario ya está en uso', validateUsername });

            const validateEmail = await repository.findByEmail(updates.email);
            if (validateEmail && validateEmail.id !== userId)
                return res.status(HttpStatusCode.Conflict).json({ error: 'El correo electrónico ya está en uso' });

            const validateDNI = await repository.findByDNI(updates.dni_ce);
            if (validateDNI && validateDNI.id !== userId)
                return res.status(HttpStatusCode.Conflict).json({ error: 'El DNI/CEX ya está en uso' });

            const validatePhone =  await repository.findByPhone(updates.phone);
            if (validatePhone && validatePhone.id !== userId)
                return res.status(HttpStatusCode.Conflict).json({ error: 'El número de teléfono ya está en uso' });

            const updatedUser = await repository.updateUser(updates);
            if (!updatedUser) return res.status(HttpStatusCode.NotFound).json({ error: 'Usuario no encontrado' });

            //remove hash_password from response
            delete updatedUser.dataValues.hash_password;
            res.status(HttpStatusCode.Ok).json(updatedUser);
        } catch (err) { res.status(HttpStatusCode.InternalServerError).json({ error: err.message }) }
    },

    async deactivateUser(req, res) {
        try {
            let { userId } = req.params;
            userId = Number(userId);

            const user = await repository.findById(userId);
            if (!user) return res.status(HttpStatusCode.NotFound).json({ error: 'Usuario no encontrado' });

            user.active = false;
            await repository.updateUser(user);
            res.status(HttpStatusCode.Ok).json({ message: 'Usuario desactivado correctamente' });
        } catch (err) { res.status(HttpStatusCode.InternalServerError).json({ error: err.message }) }
    },

    async activateUser(req, res) {
        try {
            let { userId } = req.params;
            userId = Number(userId);

            const user = await repository.findById(userId);
            if (!user) return res.status(HttpStatusCode.NotFound).json({ error: 'Usuario no encontrado' });

            user.active = true;
            await repository.updateUser(user);
            res.status(HttpStatusCode.Ok).json({ message: 'Usuario activado correctamente' });
        } catch (err) { res.status(HttpStatusCode.InternalServerError).json({ error: err.message }) }
    },

    async validateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
        if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

        try {
            const decoded = jwt.verify(token, KEY); // Lanza error si expiró o es inválido

            req.user = repository.findByToken(token);
            if(req.user.id !== decoded.id)
                return res.status(403).json({ error: 'Token no coincide con el usuario' });

            logger.log('[Auth] Token válido, user ID:', decoded.id);
            next();
        } catch (err) {
            logger.error('[Auth] Error en token:', err.message);
            return res.status(403).json({ error: 'Token inválido o expirado' });
        }
    }
};