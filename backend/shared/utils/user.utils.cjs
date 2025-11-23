module.exports = {
    removeSensibleInfo(user) {
        const {
            hash_password, username, password,
            dni_ce, token, failed_attempts,
            last_login_at, createdAt, updatedAt,
            ...safeUser } = user;
        return safeUser;
    }
}