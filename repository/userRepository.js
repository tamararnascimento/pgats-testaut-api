let users = [];
const defaultUsers = [
    {
        name: 'Meg',
        email:'meg@email.com',
        password: '98765'
    },
    {
        name: 'Fifi',
        email:'fifi@email.com',
        password: '23456'
    },
    {
        name: 'Tamara',
        email:'tamarar@email.com',
        password: '35791'
    }
];

function resetUsers() {
    users = JSON.parse(JSON.stringify(defaultUsers));
}

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

export default { findByEmail, findByLogin, create, getAll, resetUsers };
