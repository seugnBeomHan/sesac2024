import assert from 'assert/strict';

const solve_1 = () => {
    class Emp {
        firstName;
        lastName;
    }

    const makeProxyObject = (obj) => {
        const changeUpperCase = (str) => str.toUpperCase();
        const isFullName = (prop) => prop === 'fullName';

        return new Proxy(obj, {
            get(target, prop, receiver) {
                if (isFullName(prop)) return `${target.firstName} ${target.lastName}`;
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, val, receiver) {
                if (typeof val !== 'string') return false;

                if (isFullName(prop)) {
                    const [first, last] = val.split(' ');

                    last === undefined ?
                        target.lastName = changeUpperCase(first) :
                        (target.firstName = first, target.lastName = changeUpperCase(last));

                    return true;
                }
                return Reflect.set(target, prop, val, receiver);
            }
        });
    };

    const hong = makeProxyObject(new Emp());

    hong.fullName = 'Kildong Hong';
    assert.deepStrictEqual(hong.fullName, 'Kildong HONG');
    assert.deepStrictEqual(hong.firstName, 'Kildong');
    assert.deepStrictEqual(hong.lastName, 'HONG');

    hong.fullName = 'LEE';
    assert.deepStrictEqual(hong.fullName, 'Kildong LEE');
    assert.deepStrictEqual(hong.firstName, 'Kildong');
    assert.deepStrictEqual(hong.lastName, 'LEE');
};

const solve_2 = () => {
    Reflect.defineProperty(Array.prototype, 'firstObject',
        {
            get() { return this[0] },
        });

    Reflect.defineProperty(Array.prototype, 'lastObject',
        {
            get() { return this[this.length - 1] },
        });

    const isObjectKeyType = (key) => typeof key === 'string' || typeof key === 'symbol';

    Array.prototype.mapBy = function (key) {
        if (!isObjectKeyType(key)) return;
        return this.map((e) => e[key]);
    };

    Array.prototype.findBy = function (key, value) {
        if (!isObjectKeyType(key)) return;
        return this.find((e) => e[key] === value);
    };

    Array.prototype.filterBy = function (key, value) {
        if (!isObjectKeyType(key)) return;
        return this.filter((e) => e[key] === value);
    };

    Array.prototype.rejectBy = function (key, value) {
        if (!isObjectKeyType(key)) return;
        return this.filter((e) => e[key] !== value);
    };

    Array.prototype.sortBy = function (keyAndOrder) {
        if (typeof keyAndOrder !== 'string') return;

        const result = [...this];
        const [key, order = 'asc'] = keyAndOrder.split(':');

        return order === 'asc' ?
            result.sort((e1, e2) => e1[key] > e2[key] ? 1 : -1) :
            result.sort((e1, e2) => e1[key] > e2[key] ? -1 : 1);
    };

    const arr = [1, 2, 3, 4, 5];

    assert.deepStrictEqual(arr.firstObject, 1);
    assert.deepStrictEqual(arr.lastObject, 5);

    const hong = { id: 1, name: 'Hong', age: 27 };
    const kim = { id: 2, name: 'Kim', age: 27 };
    const lee = { id: 3, name: 'Lee', age: 30 };
    const users = [hong, lee, kim];

    assert.deepStrictEqual(users.firstObject, hong);
    assert.deepStrictEqual(users.lastObject, kim);
    assert.deepStrictEqual(users.mapBy('id'), [1, 3, 2]);
    assert.deepStrictEqual(users.mapBy('name'), ['Hong', 'Lee', 'Kim']);
    assert.deepStrictEqual(users, [hong, lee, kim]);
    assert.deepStrictEqual(users.findBy('name', 'Kim'), kim);
    assert.deepStrictEqual(users.findBy('name', 'Han'), undefined);
    assert.deepStrictEqual(users.findBy('age', 30), lee);
    assert.deepStrictEqual(users, [hong, lee, kim]);
    assert.deepStrictEqual(users.filterBy('id', 2), [kim]);
    assert.deepStrictEqual(users.filterBy('name', 'Hong'), [hong]);
    assert.deepStrictEqual(users.filterBy('age', 27), [hong, kim]);
    assert.deepStrictEqual(users, [hong, lee, kim]);
    assert.deepStrictEqual(users.rejectBy('id', 2), [hong, lee]);
    assert.deepStrictEqual(users.rejectBy('name', 'Hong'), [lee, kim]);
    assert.deepStrictEqual(users, [hong, lee, kim]);
    assert.deepStrictEqual(users.sortBy('name'), [hong, kim, lee]);
    assert.deepStrictEqual(users.sortBy('name:desc'), [lee, kim, hong]);
    assert.deepStrictEqual(users, [hong, lee, kim]);
};

const solve_stack = () => {
    class Stack {
        #stack;
        #length;

        constructor(...args) {
            this.#stack = [];
            this.#length = 0;

            if (args.length !== 0) this.push(...args);
        }

        push(...values) {
            if (values.length === 0) return;
            return (this.#length = this.#stack.push(...values));
        }

        pop() {
            if (this.isEmpty()) return;
            this.#length -= 1;
            return this.#stack.pop();
        }

        getLength() {
            return this.#length;
        }

        isEmpty() {
            return this.#length === 0;
        }

        peek() {
            if (this.isEmpty()) return;
            return this.#stack[this.#length - 1];
        }

        poll() {
            return this.pop();
        }

        remove() {
            return this.pop();
        }

        toArray() {
            return [...this.#stack];
        }

        print() {
            console.log(...this.#stack);
        }

        clear() {
            this.#stack = [];
            this.#length = 0;
        }
    }

    const stack = new Stack();
    const stack1 = new Stack(1, 2, 3, 4, 5);
    const stack2 = new Stack([1, 2], [3, 4, 5]);
    assert.deepStrictEqual(stack.toArray(), []);
    assert.deepStrictEqual(stack1.toArray(), [1, 2, 3, 4, 5]);
    assert.deepStrictEqual(stack2.toArray(), [[1, 2,], [3, 4, 5]]);

    stack.push();
    stack.push(3);
    stack1.push();
    stack1.push(3);
    stack2.push();
    stack2.push(3);

    assert.deepStrictEqual(stack.getLength(), 1);
    assert.deepStrictEqual(stack.isEmpty(), false);
    assert.deepStrictEqual(stack1.getLength(), 6);
    assert.deepStrictEqual(stack1.isEmpty(), false);
    assert.deepStrictEqual(stack2.getLength(), 3);
    assert.deepStrictEqual(stack2.isEmpty(), false);
    assert.deepStrictEqual(stack.push(1, 2, 5, 6, 7), 6);
    assert.deepStrictEqual(stack.getLength(), 6);
    assert.deepStrictEqual(stack.isEmpty(), false);
    assert.deepStrictEqual(stack1.push(10, 20), 8);
    assert.deepStrictEqual(stack1.getLength(), 8);
    assert.deepStrictEqual(stack1.isEmpty(), false);
    assert.deepStrictEqual(stack2.push([10, 20]), 4);
    assert.deepStrictEqual(stack2.getLength(), 4);
    assert.deepStrictEqual(stack2.isEmpty(), false);
    assert.deepStrictEqual(stack.pop(), 7);
    assert.deepStrictEqual(stack.getLength(), 5);
    assert.deepStrictEqual(stack1.pop(), 20);
    assert.deepStrictEqual(stack1.getLength(), 7);
    assert.deepStrictEqual(stack2.pop(), [10, 20]);
    assert.deepStrictEqual(stack2.getLength(), 3);
    assert.deepStrictEqual(stack.toArray().reduce((acc, cur) => acc += cur), 17);
    assert.deepStrictEqual(stack.peek(), 6);
    assert.deepStrictEqual(stack1.toArray().reduce((acc, cur) => acc += cur), 28);
    assert.deepStrictEqual(stack1.peek(), 10);
    assert.deepStrictEqual(stack2.peek(), 3);

    stack.clear();
    stack1.clear();
    stack2.clear();

    assert.deepStrictEqual(stack.isEmpty(), true);
    assert.deepStrictEqual(stack.poll(), undefined);
    assert.deepStrictEqual(stack1.isEmpty(), true);
    assert.deepStrictEqual(stack1.poll(), undefined);
    assert.deepStrictEqual(stack2.isEmpty(), true);
    assert.deepStrictEqual(stack2.poll(), undefined);

    assert.deepStrictEqual(stack.isEmpty(), true);
    assert.deepStrictEqual(stack.pop(), undefined);
    assert.deepStrictEqual(stack1.isEmpty(), true);
    assert.deepStrictEqual(stack1.pop(), undefined);
    assert.deepStrictEqual(stack2.isEmpty(), true);
    assert.deepStrictEqual(stack2.pop(), undefined);

    assert.deepStrictEqual(stack.isEmpty(), true);
    assert.deepStrictEqual(stack.remove(), undefined);
    assert.deepStrictEqual(stack1.isEmpty(), true);
    assert.deepStrictEqual(stack1.remove(), undefined);
    assert.deepStrictEqual(stack2.isEmpty(), true);
    assert.deepStrictEqual(stack2.remove(), undefined);

    assert.deepStrictEqual(stack.isEmpty(), true);
    assert.deepStrictEqual(stack.peek(), undefined);
    assert.deepStrictEqual(stack1.isEmpty(), true);
    assert.deepStrictEqual(stack1.peek(), undefined);
    assert.deepStrictEqual(stack2.isEmpty(), true);
    assert.deepStrictEqual(stack2.peek(), undefined);
};

const solve_queue = () => {
    class Queue {
        #queue;
        #length;
        #front;
    
        /**
         * reset 진행 기준 되는 버려진 공간 개수 설정
         * 전체 Queue 인스턴스에 공통적으로 사용
         */
        static #ABANDONED_SPACE_MAX = 4;
    
        constructor(...args) {
            this.#queue = [];
            this.#length = 0;
            this.#front = 0;
    
            if (args.length !== 0) this.enqueue(...args);
        }
    
        enqueue(...values) {
            if (values.length === 0) return;
            this.#length = this.#queue.push(...values);
            return this.getLength();
        }
    
        dequeue() {
            if (this.isEmpty()) return;
            if (this.#isReset()) this.#reset();
            return this.#queue[this.#front++];
        }
    
        getLength() {
            return this.#length - this.#front;
        }
    
        isEmpty() {
            return this.#length === 0 || this.#length === this.#front;
        }
    
        peek() {
            if (this.isEmpty()) return;
            return this.#queue[this.#front];
        }
    
        poll() {
            return this.dequeue();
        }
    
        remove() {
            return this.dequeue();
        }
    
        toArray() {
            return this.#getCurrentQueue();
        }
    
        print() {
            console.log(...this.#getCurrentQueue());
        }
    
        clear() {
            this.#queue = [];
            this.#length = 0;
            this.#front = 0;
        }
    
        // 버려진 공간 정리
        #reset() {
            this.#queue = this.#queue.slice(this.#front, this.#length);
            this.#length = this.getLength();
            this.#front = 0;
        }
    
        #isReset() {
            return this.#front === Queue.#ABANDONED_SPACE_MAX;
        }
    
        // 현재 유효한 범위의 array 반환
        #getCurrentQueue() {
            return this.#queue.slice(this.#front, this.#length);
        }
    }
    
    const queue = new Queue();
    assert.deepStrictEqual(queue.isEmpty(), true);
    
    queue.enqueue(3);
    
    assert.deepStrictEqual(queue.enqueue(1, 2, 3, 4, 5), 6);
    assert.deepStrictEqual(queue.getLength(), 6);
    assert.deepStrictEqual(queue.dequeue(), 3);
    assert.deepStrictEqual(queue.getLength(), 5);
    assert.deepStrictEqual(queue.dequeue(), 1);
    assert.deepStrictEqual(queue.dequeue(), 2);
    assert.deepStrictEqual(queue.getLength(), 3);
    assert.deepStrictEqual(queue.dequeue(), 3);
    assert.deepStrictEqual(queue.dequeue(), 4);
    assert.deepStrictEqual(queue.dequeue(), 5);
    assert.deepStrictEqual(queue.getLength(), 0);
    assert.deepStrictEqual(queue.isEmpty(), true);
    assert.deepStrictEqual(queue.enqueue(10, 20, 30, 40, 50), 5);
    assert.deepStrictEqual(queue.isEmpty(), false);
    assert.deepStrictEqual(queue.dequeue(), 10);
    assert.deepStrictEqual(queue.getLength(), 4);
    assert.deepStrictEqual(queue.peek(), 20);
    assert.deepStrictEqual(queue.poll(), 20);
    assert.deepStrictEqual(queue.remove(), 30);
    assert.deepStrictEqual(queue.remove(), 40);
    
    queue.enqueue(60, 70, 80, 90, 100);
    
    assert.deepStrictEqual(queue.toArray(), [50, 60, 70, 80, 90, 100]);
    assert.deepStrictEqual(queue.toArray().reduce((acc, cur) => acc += cur), 450);
    
    queue.clear();
    
    assert.deepStrictEqual(queue.peek(), undefined);
    assert.deepStrictEqual(queue.poll(), undefined);
    assert.deepStrictEqual(queue.dequeue(), undefined);
    
    const queueReset = new Queue(1, 2, 3, 4, 5, 6, 7);
    assert.deepStrictEqual(queueReset.isEmpty(), false);
    assert.deepStrictEqual(queueReset.getLength(), 7);
    assert.deepStrictEqual(queueReset.dequeue(), 1);
    assert.deepStrictEqual(queueReset.isEmpty(), false);
    assert.deepStrictEqual(queueReset.getLength(), 6);
    assert.deepStrictEqual(queueReset.dequeue(), 2);
    assert.deepStrictEqual(queueReset.isEmpty(), false);
    assert.deepStrictEqual(queueReset.getLength(), 5);
    assert.deepStrictEqual(queueReset.dequeue(), 3);
    assert.deepStrictEqual(queueReset.isEmpty(), false);
    assert.deepStrictEqual(queueReset.getLength(), 4);
    assert.deepStrictEqual(queueReset.dequeue(), 4);
    assert.deepStrictEqual(queueReset.getLength(), 3);
    assert.deepStrictEqual(queueReset.dequeue(), 5);
    assert.deepStrictEqual(queueReset.getLength(), 2);
    assert.deepStrictEqual(queueReset.dequeue(), 6);
    assert.deepStrictEqual(queueReset.getLength(), 1);
    assert.deepStrictEqual(queueReset.dequeue(), 7);
    assert.deepStrictEqual(queueReset.getLength(), 0);
    assert.deepStrictEqual(queueReset.dequeue(), undefined);
    assert.deepStrictEqual(queueReset.getLength(), 0);
};

solve_1();
solve_2();
solve_stack();
solve_queue();
