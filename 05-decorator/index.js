"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
                console.log(`我叫${this.name}, 我的年龄是${this.age}`);
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
// 04-属性装饰器:监视age值改动，打印出新的age值
function State(target, propertyKey) {
    // 用缓存key，来存储原始值，避免直接操作属性值
    let key = `__${propertyKey}`;
    Object.defineProperty(target, propertyKey, {
        get: function () {
            return this[key];
        },
        set: function (newValue) {
            console.log(`我将要设置${propertyKey}为${newValue}`);
            this[key] = newValue;
        },
        enumerable: true,
        configurable: true
    });
}
class LogTest {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
__decorate([
    State
], LogTest.prototype, "age", void 0);
let log1 = new LogTest('jerry', 20);
let log2 = new LogTest('tom', 25);
log1.age = 21;
log2.age = 26;
console.log(log1);
console.log(log2);
// 05-方法装饰器:在方法前后输出日志
function LoggerMethod(target, propertyKey, descriptor) {
    // 先存储原始方法
    const originalMethod = descriptor.value;
    // 修改方法
    descriptor.value = function (...args) {
        console.log(`${propertyKey}方法开始执行了`);
        // 执行原始方法
        const result = originalMethod.call(this, ...args);
        console.log(`${propertyKey}方法结束执行了`);
        return result;
    };
}
/**
 *
 * @param age 校验 是否成年
 */
function Validate(maxAge) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            // 自定义校验逻辑
            if (args[0] > maxAge) {
                throw new Error('年龄非法！');
            }
            // 如果所有校验通过，则调用原始方法
            return originalMethod.apply(this, args);
        };
    };
}
class MethodClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    speak() {
        console.log(`我叫${this.name},我的年龄${this.age}`);
    }
    static isAdult(age) {
        return age >= 18;
    }
}
__decorate([
    LoggerMethod
], MethodClass.prototype, "speak", null);
__decorate([
    Validate(120)
], MethodClass, "isAdult", null);
const m1 = new MethodClass('jerry', 34);
m1.speak();
MethodClass.isAdult(110);
// MethodClass.isAdult(130)//会报错提示：年龄非法
// 06-访问器装饰器
function RangeValidate(minAge, maxAge) {
    return function (target, propertyKey, descriptor) {
        // 保存原始的setter方法
        const originalSetter = descriptor.set;
        // 重写setter方法，加入校验
        descriptor.set = function (newValue) {
            if (newValue > maxAge || newValue < minAge) {
                throw new Error(`${propertyKey}的值比需大于${minAge}小于${maxAge}`);
            }
            // 如果值在范围内，且原始setter方法存在，则调用原始setter方法
            if (originalSetter) {
                originalSetter.call(this, newValue);
            }
        };
    };
}
class User {
    constructor(_age) {
        this._age = _age;
    }
    // getter:读取 age触发
    get age() {
        return this._age;
    }
    set age(value) {
        console.log('@');
        this._age = value;
    }
}
__decorate([
    RangeValidate(1, 120)
], User.prototype, "age", null);
let user1 = new User(30);
console.log(user1.age);
user1.age = 10;
// 07-参数装饰器
function Required(target, propertyKey, parameterIndex) {
    // 将新规则添加到原始方法的参数校验规则中
    const rules = target.__required_params__ || [];
    rules.push({
        methodName: propertyKey,
        parameterIndex: parameterIndex,
        message: `${propertyKey}方法的第${parameterIndex + 1}个参数是必填的`
    });
    target.__required_params__ = rules;
}
// 方法装饰器：在方法执行前，先校验参数是否符合规则
function ValidateMethod(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...arges) {
        const rules = target.__required_params__ || [];
        for (const rule of rules) {
            if (rule.methodName === propertyKey) {
                const arge = arges[rule.parameterIndex];
                if (arge === undefined || arge === null) {
                    throw new Error(rule.message);
                }
            }
        }
        return originalMethod.apply(this, arges);
    };
}
class ParamTest {
    speak(content) {
        console.log(content);
    }
}
__decorate([
    ValidateMethod,
    __param(0, Required)
], ParamTest.prototype, "speak", null);
const param1 = new ParamTest();
param1.speak('lalalla');
param1.speak(); // 这里没有传入参数，应该触发参数校验规则
