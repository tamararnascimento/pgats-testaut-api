const purchases = [
    {
        email: 'meg@email.com',
        products: [1, 2],
        total: 6000,
        paymentMethod: 'cartaoCredito'
    },

    {
        email: 'fifi@email.com',
        products: [3],
        total: 6000,
        paymentMethod: 'boleto'
    }
];

function create(purchase) {
    purchases.push(purchase);
}

function getAll() {
    return purchases;
}

export default { create, getAll };
