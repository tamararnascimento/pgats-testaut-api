import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    const { cepOrigem, cepDestino } = req.query;

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cepOrigem) || !cepRegex.test(cepDestino) || cepOrigem === '00000-000') {
        return res.status(500).json({ message: 'Erro ao calcular o frete.' });
    }

    return res.status(200).json({
        cep: cepOrigem,
        destino: cepDestino,
        valor: 50.0
    });
});

export default router;
