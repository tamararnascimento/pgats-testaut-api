import userRepository from '../../repository/userRepository.js';
import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import app from '../../app.js';

describe('User Registration', () => {
    let createUserStub;

    beforeEach(() => {
    createUserStub = sinon.stub(userRepository, 'create');
        userRepository.resetUsers();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Deve registrar um usuário com sucesso', async () => {
        const novoUser = {
            name: 'Gabi',
            email: 'gabi@email.com',
            password: '24680'
        };

        createUserStub.resolves(novoUser);

        const res = await request(app)
            .post('/users/register')
            .send(novoUser);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('message', 'Usuário registrado com sucesso.');
            expect(createUserStub.calledOnce).to.be.true;
    });

    it('Não deve registrar usuário com email já existente', async () => {
        const userExistente = {
            name: 'Meg',
            email: 'meg@email.com',
            password: '98765'
        };

        createUserStub.rejects(new Error('E-mail já registrado.'));

        const res = await request(app)
            .post('/users/register')
            .send(userExistente);
        
        expect(res.status).to.equal(409);
        expect(res.body).to.have.property('message', 'E-mail já registrado.');
            expect(createUserStub.called).to.be.false;
    });

    it('Não deve registrar usuário com campos faltando', async () => {
        const userIncompleto = {
            name:'Ana',
            email: ''
        };

        createUserStub.rejects(new Error('Todos os campos são obrigatórios.'));

        const res = await request(app)
            .post('/users/register')
            .send(userIncompleto);

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Todos os campos são obrigatórios.');
            expect(createUserStub.called).to.be.false;
    });
});