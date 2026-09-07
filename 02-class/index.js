"use strict";
// 01-类
// 定义一个类：readonly:只读属性，属性无法修改
class Person {
    // 简写前
    // public readonly name: string
    // age: number
    // constructor(name: string, age: number) {
    //     this.name = name
    //     this.age = age
    // }
    // 简写后：可这样写
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak() {
        console.log("我叫" + this.name + ", 年龄是" + this.age);
    }
}
// 继承一个类
class Studen extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    study() {
        console.log("我叫" + this.name + ", 我正在努力的学习。。。。");
    }
    // 重写父类的方法
    speak() {
        console.log("我是学生，我叫" + this.name + ", 年龄是" + this.age);
    }
}
let person = new Person('tom', 16);
person.speak();
let student = new Studen('jack', 18, '高一');
student.speak();
student.study();
// 02-抽象类
class Package {
    constructor(weight) {
        this.weight = weight;
    }
    // 具体方法
    printPackage() {
        console.log("包裹重量：" + this.weight + "kg, 运费：" + this.calculate() + "元");
    }
}
// 继承抽象类，并实现对应的抽象方法
class StandardPackage extends Package {
    constructor(weight, unitPrice) {
        super(weight);
        this.weight = weight;
        this.unitPrice = unitPrice;
    }
    calculate() {
        return this.unitPrice * this.weight;
    }
}
const standardPackage = new StandardPackage(5, 5);
standardPackage.printPackage();
