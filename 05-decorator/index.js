"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 装饰器的使用
// 01-类装饰器
function CustomString(target) {
    target.prototype.toString = function () {
        return JSON.stringify(this);
    };
    // 封闭其原型对象，禁止随意操作其原型对象
    Object.seal(target.prototype);
}
let Person = class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
Person = __decorate([
    CustomString
], Person);
let p1 = new Person('tom', 23);
console.log(p1.toString());
// 如果装饰器有返回一个新类，则会替换掉被装饰的类
function LogTime(target) {
    return class extends target {
        constructor(...args) {
            super(args);
            this.createdTime = new Date(); //记录对象创建的时间
        }
        getCreatedTime() {
            return `该对象创建时间为${this.createdTime}`;
        }
    };
}
let Test = class Test {
    test() {
        console.log(100);
    }
};
Test = __decorate([
    LogTime
], Test);
let t1 = new Test();
console.log(t1.getCreatedTime());
console.log(t1.test());
// 该函数的入参：需要一个类
function testClass(fn) {
}
class PersonTest {
}
testClass(PersonTest);
// 02-装饰器工厂：让装饰器更灵活，如果传入配置：opts
// 需求：对Student类进行自动自我介绍，根据传入的n，介绍n次
// 装饰器工厂
function Introduce(n) {
    // 返回装饰器
    return function (target) {
        target.prototype.introduce = function () {
            for (let i = 0; i < n; i++) {
                console.log(`我叫${this.name}, 我的年龄${this.age}`);
            }
        };
    };
}
let Student = class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
Student = __decorate([
    Introduce(5)
], Student);
let s1 = new Student('jerry', 20);
s1.introduce();
// 03-装饰器组合：执行顺序
function test1(target) {
    console.log('test1');
}
function test2() {
    console.log('test2工厂');
    return function (target) {
        console.log('test2');
    };
}
function test3() {
    console.log('test3工厂');
    return function (target) {
        console.log('test3');
    };
}
function test4(target) {
    console.log('test4');
}
// 其中test2(), test3() 是装饰器工厂，返回test2装饰器，test3装饰器
// 执行的顺序是：先从上到下，执行装饰器工厂，然后 从下到上依次执行装饰器
let Compose = class Compose {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
Compose = __decorate([
    test1,
    test2(),
    test3(),
    test4,
    CustomString,
    LogTime,
    Introduce(5)
], Compose);
let c1 = new Compose('yahoo', 23);
console.log(c1.toString());
console.log(c1.getCreatedTime());
console.log(c1.introduce());
