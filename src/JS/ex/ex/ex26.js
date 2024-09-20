// // const dog = {
// //     name: 'Max',
// //     showMyName() {
// //         console.log(`My name is ${this.name}.`);
// //     },
// //     whatsYourName() {
// //         setTimeout(() => { this.showMyName() }, 100);
// //     }
// // };

// // dog.whatsYourName();

// // console.log(this);
// // this.name = 'Module';
// // this.name = 'Module';

// // const expressFn = function (name) {
// //     this.name = name;
// //     console.log(this, new.target, this.name, expressFn.name);
// // }

// // const arrowFn = (name) => {
// //     this.name = name;
// //     console.log(this, this.name, arrowFn.name);
// // }
// // expressFn('expfn');
// // arrowFn('afn');

// // const exFn = new expressFn('D');
// // const aFn = new arrowFn('A');

// // const Dog = function (name) {
// //     console.log(this);
// //     console.log(new.target);
// //     console.log(this instanceof Dog);

// //     this.name = name;

// //     this.bark = function () {
// //         console.log('bark=', new.target, this.name, name);
// //     };

// //     this.bark2 = () =>
// //         console.log('bark2=', new.target, this.name, name);
// // }


// // // const dog = Dog('Doggy');
// // const lucy = new Dog('Lucy');
// // // Dog.bark(); // ?
// // lucy.bark(); // ?
// // lucy.bark2(); // ?
// // console.log('type=', typeof dog); // ?
// // console.log('type=', typeof lucy); // ?


// const Cat = (name) => {
//     console.log(this, new.target);
//     this.name = name;
//     this.bark = function () {
//         console.log('bark=', new.target, this.name, name);
//     };
//     this.bark2 = () =>
//         console.log('bark2=', new.target, this.name, name);

//     return this;
// }

// // const cat = Cat('Coco');
// // const cat = new Cat(''); // error!!
// cat.bark(); // ?
// cat.bark2(); // ?
// Cat.bark(); // ?
// console.log('type=', typeof cat); // ? 


for (let i = 0; i < 5; i += 1) {
    setTimeout(() => {
        console.log(i);
    }, 100);
}   