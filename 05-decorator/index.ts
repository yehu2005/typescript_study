// 装饰器的使用
// 01-类装饰器
function CustomString(target: Function) {
    target.prototype.toString = function () {
        return JSON.stringify(this)
    }
    // 封闭其原型对象，禁止随意操作其原型对象
    Object.seal(target.prototype)
}

@CustomString
class Person {
    constructor(
        public name: string,
        public age: number) { }
}

let p1 = new Person('tom', 23)
console.log(p1.toString())

// 如果装饰器有返回一个新类，则会替换掉被装饰的类
function LogTime<T extends Constructor>(target: T) {
    return class extends target {
        createdTime: Date
        constructor(...args: any[]) {
            super(args)
            this.createdTime = new Date() //记录对象创建的时间
        }

        getCreatedTime() {
            return `该对象创建时间为${this.createdTime}`
        }
    }
}

interface Test {
    getCreatedTime(): void
}

@LogTime
class Test {
    test() {
        console.log(100)
    }
}

let t1 = new Test()
console.log(t1.getCreatedTime())
console.log(t1.test())

// 关于构造类型
/**
 * new：表示：该类型可以用new操作符调用
 * ...args 表示：构造器可以接收任意数量的参数
 * any[] 表示：构造器可以接收任意类型的参数
 * {} 表示：返回类型是对象（非null、非undefined的对象）
 */
// 仅约束构造函数
type Constructor = new (...args: any[]) => {}

// 约束构造函数+静态属性wife
type ConstructorWithStaticFiled = {
    new(...args: any[]): {}, // 构造签名
    wife: string
}

// 该函数的入参：需要一个类
function testClass(fn: ConstructorWithStaticFiled) {

}
class PersonTest {
    static wife: string
}

testClass(PersonTest)

// 02-装饰器工厂：让装饰器更灵活，如果传入配置：opts
// 需求：对Student类进行自动自我介绍，根据传入的n，介绍n次
// 装饰器工厂
function Introduce(n: number) {
    // 返回装饰器
    return function (target: Function) {
        target.prototype.introduce = function () {
            for (let i = 0; i < n; i++) {
                console.log(`我叫${this.name}, 我的年龄${this.age}`)
            }
        }
    }
}

interface Student {
    introduce(): void
}

@Introduce(5)
class Student {
    constructor(
        public name: string,
        public age: number
    ) { }
}

let s1 = new Student('jerry', 20)
s1.introduce()

// 03-装饰器组合：执行顺序
function test1(target: Function) {
    console.log('test1')
}

function test2() {
    console.log('test2工厂')
    return function (target: Function) {
        console.log('test2')
    }
}

function test3() {
    console.log('test3工厂')
    return function (target: Function) {
        console.log('test3')

    }
}

function test4(target: Function) {
    console.log('test4')
}

// 其中test2(), test3() 是装饰器工厂，返回test2装饰器，test3装饰器
// 执行的顺序是：先从上到下，执行装饰器工厂，然后 从下到上依次执行装饰器
@test1
@test2()
@test3()
@test4
@CustomString
@LogTime
@Introduce(5)
class Compose {
    constructor(public name: string, public age: number) { }
}

interface Compose {
    getCreatedTime(): void
    introduce(): void
}

let c1 = new Compose('yahoo', 23)
console.log(c1.toString())
console.log(c1.getCreatedTime())
console.log(c1.introduce())
