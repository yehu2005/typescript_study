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
                console.log(`我叫${this.name}, 我的年龄是${this.age}`)
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

interface Compose {
    getCreatedTime(): void
    introduce(): void
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

let c1 = new Compose('yahoo', 23)
console.log(c1.toString())
console.log(c1.getCreatedTime())
console.log(c1.introduce())

// 04-属性装饰器:监视age值改动，打印出新的age值
function State(target: object, propertyKey: string) {
    // 用缓存key，来存储原始值，避免直接操作属性值
    let key = `__${propertyKey}`
    Object.defineProperty(target, propertyKey, {
        get: function () {
            return this[key]
        },
        set: function (newValue: number) {
            console.log(`我将要设置${propertyKey}为${newValue}`)
            this[key] = newValue
        },
        enumerable: true,
        configurable: true
    })
}


class LogTest {
    name: string
    @State age: number
    static wife: string

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

let log1 = new LogTest('jerry', 20)
let log2 = new LogTest('tom', 25)
log1.age = 21
log2.age = 26
console.log(log1)
console.log(log2)

// 05-方法装饰器:在方法前后输出日志
function LoggerMethod(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
    // 先存储原始方法
    const originalMethod = descriptor.value
    // 修改方法
    descriptor.value = function (...args: any[]) {
        console.log(`${propertyKey}方法开始执行了`)
        // 执行原始方法
        const result = originalMethod.call(this, ...args)
        console.log(`${propertyKey}方法结束执行了`)
        return result
    }
}

/**
 * 
 * @param age 校验 是否成年
 */
function Validate(maxAge: number) {
    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value
        descriptor.value = function (...args: any[]) {
            // 自定义校验逻辑
            if (args[0] > maxAge) {
                throw new Error('年龄非法！')
            }
            // 如果所有校验通过，则调用原始方法
            return originalMethod.apply(this, args)
        }
    }
}

class MethodClass {
    constructor(public name: string, public age: number) { }

    @LoggerMethod
    speak() {
        console.log(`我叫${this.name},我的年龄${this.age}`)
    }

    @Validate(120)
    static isAdult(age: number) {
        return age >= 18
    }
}

const m1 = new MethodClass('jerry', 34)
m1.speak()

MethodClass.isAdult(110)
// MethodClass.isAdult(130)//会报错提示：年龄非法

// 06-访问器装饰器
function RangeValidate(minAge: number, maxAge: number) {
    return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
        // 保存原始的setter方法
        const originalSetter = descriptor.set
        // 重写setter方法，加入校验
        descriptor.set = function (newValue: number) {
            if (newValue > maxAge || newValue < minAge) {
                throw new Error(`${propertyKey}的值比需大于${minAge}小于${maxAge}`)
            }

            // 如果值在范围内，且原始setter方法存在，则调用原始setter方法
            if (originalSetter) {
                originalSetter.call(this, newValue)
            }
        }

    }
}

class User {
    private _age: number
    constructor(_age: number) {
        this._age = _age
    }

    // getter:读取 age触发
    get age(): number {
        return this._age
    }

    @RangeValidate(1, 120)
    set age(value: number) {
        console.log('@')
        this._age = value
    }

}

let user1 = new User(30)
console.log(user1.age)
user1.age = 10

// 07-参数装饰器
function Required(target: any, propertyKey: string, parameterIndex: number) {
    // 将新规则添加到原始方法的参数校验规则中
    const rules = target.__required_params__ || []
    rules.push({
        methodName: propertyKey,
        parameterIndex: parameterIndex,
        message: `${propertyKey}方法的第${parameterIndex + 1}个参数是必填的`
    })
    target.__required_params__ = rules
}

// 方法装饰器：在方法执行前，先校验参数是否符合规则
function ValidateMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    descriptor.value = function (...arges: any[]) {
        const rules = target.__required_params__ || []
        for (const rule of rules) {
            if (rule.methodName === propertyKey) {
                const arge = arges[rule.parameterIndex]
                if (arge === undefined || arge === null) {
                    throw new Error(rule.message)
                }
            }
        }
        return originalMethod.apply(this, arges)
    }
}

class ParamTest {
    @ValidateMethod
    speak(@Required content?: string) {
        console.log(content)
    }
}

const param1 = new ParamTest()
param1.speak('lalalla')
param1.speak() // 这里没有传入参数，应该触发参数校验规则