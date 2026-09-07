"use strict";
class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    run() {
        console.log("我叫" + this.name + ", 正在跑步。。。");
    }
}
const s1 = new Student('tom', 18);
s1.run();
let car = {
    name: 'mx5',
    color: 'white',
    // model: '跑车',
    run(n) {
        console.log(this.name + ",颜色：" + this.color + ",型号：" + this.model + ",跑了" + n + "米");
    }
};
// car.color = 'yellow'
car.run(100);
const count = (x, y) => {
    return x + y;
};
let result = count(5, 6);
console.log(result);
const s2 = {
    name: 'tom',
    age: 12,
    color: 'white',
    grade: '初中'
};
