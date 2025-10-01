import userRepository from '../repository/userRepository.js';
import jwt from 'jsonwebtoken';
const SECRET = 'pgats-secret';

function register(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    if (userRepository.findByEmail(email)) {
        return res.status(409).json({ message: 'E-mail já registrado.' });
    }
    userRepository.create({ name, email, password, verified: false, creditCard: null });
    return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
}

function login(req, res) {
    const { email, login, password } = req.body;
    const user = email ? userRepository.findByEmail(email) : userRepository.findByLogin(login);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ email: user.email, verified: user.verified }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
}

function getUsers(req, res) {
    const users = userRepository.getAll();
    return res.json(users);
}

export default { register, login, getUsers };
