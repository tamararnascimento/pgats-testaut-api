const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');

const jwt = require('jsonwebtoken');
const SECRET = 'pgats-secret';

describe('Registro de Compra', () => {

    let token;
    const userRepository = require('../../repository/userRepository');

    beforeEach(() => {
        userRepository.resetUsers();
        // Adiciona creditCard ao usuário Meg
        const meg = userRepository.findByEmail('meg@email.com');
        if (meg) {
            meg.creditCard = '1234-5678-9012-3456';
            meg.verified = true;
        }
        token = jwt.sign({email: 'meg@email.com', verified: true}, SECRET, {expiresIn: '1h'});
    });

    it('Deve registrar uma compra com sucesso', async () =>{
        const novaCompra = {
            products: [1, 2],
            total: 6000,
            paymentMethod: 'cartaoCredito'
        };


    const res = await request(app)
        .post('/purchases')
        .set('Authorization', `Bearer ${token}`)
        .send(novaCompra);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Compra realizada com sucesso.');
    });
});