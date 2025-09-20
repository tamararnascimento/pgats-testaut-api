const purchases = [];

function create(purchase) {
    purchases.push(purchase);
}

function getAll() {
    return purchases;
}

module.exports = { create, getAll };
