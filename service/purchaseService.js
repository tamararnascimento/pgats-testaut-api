const userRepository = require('../repository/userRepository');
const productRepository = require('../repository/productRepository');
const purchaseRepository = require('../repository/purchaseRepository');

function makePurchase(req, res) {
    const { products, total, paymentMethod } = req.body;
    const userEmail = req.user.email;
    const user = userRepository.findByEmail(userEmail);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    if (total > 5000 && !user.creditCard) {
        return res.status(403).json({ message: 'Compras acima de R$ 5.000,00 exigem cartão de crédito salvo.' });
    }
    for (const productId of products) {
        const product = productRepository.findById(productId);
        if (!product) return res.status(404).json({ message: `Produto ${productId} não encontrado.` });
        if (product.exclusive && !user.verified) {
            return res.status(403).json({ message: `Produto exclusivo só pode ser comprado por usuários verificados.` });
        }
    }
    purchaseRepository.create({ userEmail, products, total, paymentMethod });
    return res.status(201).json({ message: 'Compra realizada com sucesso.' });
}

module.exports = { makePurchase };
