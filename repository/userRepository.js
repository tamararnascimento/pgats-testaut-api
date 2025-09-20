const users = [];

function findByEmail(email) {
    return users.find(u => u.email === email);
}

function findByLogin(login) {
    return users.find(u => u.name === login);
}

function create(user) {
    users.push(user);
}

function getAll() {
    return users;
}

module.exports = { findByEmail, findByLogin, create, getAll };
