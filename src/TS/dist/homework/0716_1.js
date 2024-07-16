"use strict";
const SIZE_INFO = [
    { id: 'XS', price: 8000 },
    { id: 'S', price: 10000 },
    { id: 'M', price: 12000 },
    { id: 'L', price: 14000 },
    { id: 'XL', price: 15000 },
];
const sizeOption = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };
const totalPrice = SIZE_INFO.reduce((curPrice, size) => curPrice + (sizeOption[size.id] * size.price), 0);
console.log(totalPrice);
