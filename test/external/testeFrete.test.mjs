import request from 'supertest';
import { expect } from 'chai';
import app from '../../app.js';

describe('Cálculo do Frete', () => {
    it('Deve calcular o frete corretamente para um CEP válido', async () => {
        const cepOrigem = '01001-000'; 
        const cepDestino = '20040-020';

        const res = await request(app)
            .get(`/freight?cepOrigem=${cepOrigem}&cepDestino=${cepDestino}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('cep', '01001-000');
        expect(res.body).to.have.property('valor', 50.0);

    });

    it('Deve retornar erro para CEP inválido', async () => {
        const cepOrigem = '00000-000';
        const cepDestino = '20040-020';

        const res = await request(app)
            .get(`/freight?cepOrigem=${cepOrigem}&cepDestino=${cepDestino}`);

        expect(res.body).to.have.property('message', 'Erro ao calcular o frete.');
        expect(res.status).to.equal(500);
    });
});
