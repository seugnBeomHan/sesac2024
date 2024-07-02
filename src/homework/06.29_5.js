import assert from 'assert/strict';

const hrTeam = { id: 1, dname: '인사팀' };
const devTeam = { id: 2, dname: '개발팀' };

const depts = [hrTeam, devTeam];
const deptMap = depts.reduce((map, cur, i) => map.set(i + 1, cur), new Map());
console.log('deptMap >> ', deptMap);

//

const hong = { id: 1, name: 'Hong', dept: 1 };
const kim = { id: 2, name: 'Kim', dept: 2 };

const emps = [hong, kim, { id: 3, name: 'Park', dept: 2 }, { id: 4, name: 'Choi', dept: 2 }];
const empMap = emps.reduce((map, cur, i) => map.set(i + 1, cur), new Map());
console.log('empMap >> ', empMap);

//

const empDeptMap = new Map();
for (const emp of empMap.values()) {
    for (const dept of deptMap.values()) {
        if (emp.dept === dept.id) {
            empDeptMap.set(emp, dept);
            break;
        }
    };
}
console.log('empDeptMap >> ', empDeptMap);

assert.deepStrictEqual(empDeptMap.get(kim).dname, '개발팀');
assert.deepStrictEqual(empDeptMap.get(hong).dname, '인사팀');

// 개발팀 직원 목록 출력
let result = [];
const iter = empDeptMap.keys();

while (true) {
    const { value: key, done } = iter.next();

    if (done) break;

    if (empDeptMap.get(key).dname === '개발팀') {
        result.push(key.name);
    }
}

console.log('개발팀 직원 목록: ', result.toString());
assert.deepStrictEqual(result.toString(), 'Kim,Park,Choi');
