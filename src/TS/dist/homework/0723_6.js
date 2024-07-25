const stock = { X: 1, Y: 2, Z: 30 };
// const itemPrice: ItemPrice<Item, typeof stock> = { item: 'X', price: 1000 };
const itemPrices = [
    { item: 'X', price: 1000 },
    { item: 'Y', price: 2000 },
    { item: 'Z', price: 3000 },
];
const total = itemPrices.reduce((curr, itemPrice) => curr + stock[itemPrice.item] * itemPrice.price, 0);
console.log(total);
export {};
