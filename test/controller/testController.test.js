const request = require('supertest');
const { expect} = require('chai');
const app = require('../../app');

describe('User Registration', () => {
    const userRepository = require('../../repository/userRepository');

    beforeEach(() => {
        userRepository.resetUsers();
    });
    it('Deve registrar um usuário com sucesso', async () => {
        const novoUser = {
            name: 'Gabi',
            email: 'gabi@email.com',
            password: '24680'
        };

        const res = await request(app)
            .post('/users/register')
            .send(novoUser);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message', 'Usuário registrado com sucesso.');
    });

    it('Não deve registrar usuário com email já existente', async () => {
        const userExistente = {
            name: 'Meg',
            email: 'meg@email.com',
            password: '98765'
        };

        const res = await request(app)
            .post('/users/register')
            .send(userExistente);
        
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('message', 'E-mail já registrado.');
    });

    it('Não deve registrar usuário com campos faltando', async () => {
        const userIncompleto = {
            name:'Ana',
            email: ''
        };

        const res = await request(app)
            .post('/users/register')
            .send(userIncompleto);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Todos os campos são obrigatórios.');
    });
});