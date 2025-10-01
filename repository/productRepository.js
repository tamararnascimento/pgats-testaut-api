const products = [
    { id: 1, name: 'Notebook', price: 3500, exclusive: false },
    { id: 2, name: 'Smartphone', price: 2500, exclusive: false },
    { id: 3, name: 'Relógio Exclusivo', price: 6000, exclusive: true },
    { id: 4, name: 'Fone de Ouvido', price: 500, exclusive: false }
];

function findById(id) {
    return products.find(p => p.id === id);
}

function getAll() {
    return products;
}

export default { findById, getAll };
