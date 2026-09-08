"use strict";
// 泛型的使用
// 01-泛型函数
function printResult(data1, data2) {
    console.log(data1);
    console.log(data2);
    return [data1, data2];
}
printResult(100, 'ok');
printResult('success', 666);
const u1 = {
    name: 'tom',
    age: 23,
    extraInfo: '初中',
    extraInfo2: false
};
console.log(u1);
let p1 = {
    name: 'tom',
    age: 23,
    extraInfo: {
        title: '开发者',
        company: 'xxx公司'
    }
};
// 03-泛型类
class Person {
    constructor(name, age, extraInfo) {
        this.name = name;
        this.age = age;
        this.extraInfo = extraInfo;
    }
    speak() {
        console.log(`我叫${this.name},今年${this.age}岁了`);
        console.log(this.extraInfo);
    }
}
let p22 = new Person('tom', 23, { title: '开发者', company: 'xxx公司' });
p22.speak();
