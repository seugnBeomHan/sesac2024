// // 1안
// type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';
// type Info = {
//     id: Size;
//     price: number;
// }
export {};
// const SIZE_INFO: Info[] = [
//     { id: 'XS', price: 8000 },
//     { id: 'S', price: 10000 },
//     { id: 'M', price: 12000 },
//     { id: 'L', price: 14000 },
//     { id: 'XL', price: 15000 },
// ];
// const sizeOption = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };
// const totalPrice = SIZE_INFO.reduce((curPrice, size) =>
//     curPrice + (sizeOption[size.id] * size.price), 0
// );
// // 2안
// type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';
// const SIZE: { id: Size, price: number }[] = [
//     { id: 'XS', price: 8000 },
//     { id: 'S', price: 10000 },
//     { id: 'M', price: 12000 },
//     { id: 'L', price: 14000 },
//     { id: 'XL', price: 15000 },
// ];
// const sizeOption = { XS: 1, S: 5, MM: 2, L: 2, XL: 4 };
// const totalPrice = SIZE.reduce((curPrice, size) =>
//     curPrice += (sizeOption[size.id] * size.price), 0
// );
// //3안
// const SIZE = [
//     { id: 'XS' as const, price: 8000 },
//     { id: 'S' as const, price: 10000 },
//     { id: 'M' as const, price: 12000 },
//     { id: 'L' as const, price: 14000 },
//     { id: 'XL' as const, price: 15000 },
// ];
// const sizeOption = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };
// const totalPrice = SIZE.reduce((curPrice, size) =>
//     curPrice + (sizeOption[size.id] * size.price), 0
// );
// //4안
// const SIZE = [
//     { id: 'XS', price: 8000 },
//     { id: 'S', price: 10000 },
//     { id: 'M', price: 12000 },
//     { id: 'L', price: 14000 },
//     { id: 'XL', price: 15000 },
// ] as const;
// const sizeOption = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };
// const totalPrice = SIZE.reduce((curPrice, size) =>
//     curPrice + (sizeOption[size.id] * size.price), 0
// );
// // 5안
// const SIZE = [
//     { id: 'XS', price: 8000 },
//     { id: 'S', price: 10000 },
//     { id: 'M', price: 12000 },
//     { id: 'L', price: 14000 },
//     { id: 'XL', price: 15000 },
// ];
// const sizeOption = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };
// const totalPrice = SIZE.reduce((curPrice, { id, price }) => {
//     if (id === 'XS' || id === 'S' || id === 'M' || id === 'L' || id === 'XL') {
//         return curPrice += (sizeOption[id] * price);
//     }
//     return curPrice;
// }, 0);
// console.log(totalPrice);
