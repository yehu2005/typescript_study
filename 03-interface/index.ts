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

// 04-接口可以继续
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
