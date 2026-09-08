// 接口的使用
// 01-定义类结构
interface IPerson {
    name: string
    age: number
    run(): void
}

class Student implements IPerson {
    constructor(public name: string, public age: number) {

    }

    run(): void {
        console.log("我叫" + this.name + ", 正在跑步。。。")
    }
}

const s1 = new Student('tom', 18)
s1.run()

// 02-定义对象结构
interface CarInterface {
    name: string
    readonly color: string // 只读属性
    model?: string // 可选属性

    // 定义方法
    run: (n: number) => void
}

let car: CarInterface = {
    name: 'mx5',
    color: 'white',
    // model: '跑车',
    run(n): void {
        console.log(this.name + ",颜色：" + this.color + ",型号：" + this.model + ",跑了" + n + "米")
    }
}

// car.color = 'yellow'
car.run(100)

// 03-定义函数结构
interface CountInterface {
    (a: number, b: number): number
}

const count: CountInterface = (x, y) => {
    return x + y
}

let result = count(5, 6)
console.log(result)

// 04-接口可以继承
interface PersonInterface {
    name: string
    age: number
}

interface StudentInterface extends PersonInterface {
    grade: string
}


// 05-接口可以合并
interface PersonInterface {
    color: string
}

const s2: StudentInterface = {
    name: 'tom',
    age: 12,
    color: 'white',
    grade: '初中'
}


// 06-interface 与 type 区别
// 相同点：都可以定义对象结构
// 不同点：
// interface更专注于对象和类的结构，支持继承、合并；
// type 可以定义类型别名、联合类型和交叉类型，不支持继承和自动合并

type shuzi = number
let a1: shuzi = 666
type result = string | number
let r1: result = 'ok'
r1 = 1000

// 交叉类型示例
type User = {
    id: number,
    name: string
}

type Timestamp = {
    createTime: number,
    updateTime: number
}

type UserVo = User & Timestamp

let user1: UserVo = {
    id: 1,
    name: 'tom',
    createTime: 111,
    updateTime: 222
}

// 07-interface 与 抽象类的区别
// 相同点：都可以来约束类（应该遵循的契约 类的格式）
// 不同点：
// 接口：只能定义，不能实现，并且一个类可以实现多个接口；抽象类：可以定义，也可以实现，但是一个类只能继承一个抽象类；
