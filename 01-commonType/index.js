"use strict";
// 01-any类型
// 显示any
let a;
a = 'hello';
a = 132;
a = false;
// 隐式any
let b;
b = 'world';
b = 234;
b = true;
// 注意any坑: any可以赋值给任何类型，会破坏c类型
let c;
c = a;
// 注意any坑：任意类型不可以赋值给any
let d;
// a = d
console.log(a);
console.log(b);
console.log(c);
// 02-unknown类型：类型安全的any
let e;
e = 132;
e = false;
e = 'hello';
// 如果将unknown赋值给其他类型，会报提示错误，而any不会
let f;
// f = e 这样写会报错
// 下面这些写，可以
if (typeof e === 'string') {
    f = e;
}
// 断言
f = e;
// 断言的第二种写法
f = e;
console.log(f);
// 03- never、void 用于函数的返回值申明
// void 可以接受 undefined
// 04- object、Object(比小object更宽泛，除了null、undefined，其他都能存储)
let obj; // 能存储的类型是：非原始类型
obj = {};
obj = { name: 'tom' };
obj = [1, 2, 3];
obj = function () { };
obj = new String("tom");
class Person {
}
obj = new Person();
// 那如何申明一个对象
let person;
person = { name: 'tom', age: 32, gender: '男' };
person = { name: 'yahoo' };
// 申明一个函数：把count定义为一个函数（入参，a：number， b：number） 返回：number
let count;
count = function (a, b) {
    return a + b;
};
// 申明数组
let arr1;
let arr2;
arr1 = ['a', 'b'];
arr2 = [100, 200];
// 05-tuple 元组：特殊的数组类型，可以存储固定数量的元素，并且每个元素的类型是已知的且可以不同。
let arr3;
arr3 = ['abc', 100];
let arr4;
arr4 = [133, 'a', 'b', 'c'];
console.log(1 /* Direction.Down */);
function walk(str) {
    console.log(str);
    if (str === 0 /* Direction.Up */) {
        console.log("up");
    }
}
walk(2 /* Direction.Left */);
// 字符串枚举,没有反向映射
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "shang";
    Direction2["Down"] = "xia";
    Direction2["Left"] = "zuo";
    Direction2["Right"] = "you";
})(Direction2 || (Direction2 = {}));
console.log(Direction2);
function printStatus(data) {
    console.log(data);
}
function printGender(data) {
    console.log(data);
}
printStatus(404);
printStatus('404');
printGender('男');
printGender('女');
const house = {
    height: 100,
    width: 100,
    cell: 1,
    num: 50,
    room: '701'
};
const f1 = function () {
    // return undefined
    return 66; //ok
};
