// 01-any类型
// 显示any
let a: any
a = 'hello'
a = 132
a = false

// 隐式any
let b
b = 'world'
b = 234
b = true

// 注意any坑: any可以赋值给任何类型，会破坏c类型
let c: string
c = a

// 注意any坑：任意类型不可以赋值给any
let d: number
// a = d

console.log(a)
console.log(b)
console.log(c)

// 02-unknown类型：类型安全的any
let e: unknown
e = 132
e = false
e = 'hello'

// 如果将unknown赋值给其他类型，会报提示错误，而any不会
let f: string
// f = e 这样写会报错
// 下面这些写，可以
if (typeof e === 'string') {
    f = e
}

// 断言
f = e as string
// 断言的第二种写法
f = <string>e

console.log(f)

// 03- never、void 用于函数的返回值申明
// void 可以接受 undefined


// 04- object、Object(比小object更宽泛，除了null、undefined，其他都能存储)
let obj: object // 能存储的类型是：非原始类型

obj = {}
obj = { name: 'tom' }
obj = [1, 2, 3]
obj = function () { }
obj = new String("tom")
class Person { }
obj = new Person()

// 那如何申明一个对象
let person: { name: string, age?: number, [key: string]: any }
person = { name: 'tom', age: 32, gender: '男' }
person = { name: 'yahoo' }

// 申明一个函数：把count定义为一个函数（入参，a：number， b：number） 返回：number
let count: (a: number, b: number) => number
count = function (a, b) {
    return a + b
}

// 申明数组
let arr1: string[]
let arr2: Array<number>
arr1 = ['a', 'b']
arr2 = [100, 200]


// 05-tuple 元组：特殊的数组类型，可以存储固定数量的元素，并且每个元素的类型是已知的且可以不同。
let arr3: [string, number]
arr3 = ['abc', 100]
let arr4: [number, ...string[]]
arr4 = [133, 'a', 'b', 'c']

// 06-enum枚举：一组一组相关的常量值，放在枚举里，代码可维护，增强可读性,不能改 
// 数字枚举；常量枚举：const
const enum Direction {
    Up,
    Down,
    Left,
    Right
}
console.log(Direction.Down)

function walk(str: Direction) {
    console.log(str)
    if (str === Direction.Up) {
        console.log("up")
    }

}

walk(Direction.Left)

// 字符串枚举,没有反向映射
enum Direction2 {
    Up = 'shang',
    Down = 'xia',
    Left = 'zuo',
    Right = 'you'
}

console.log(Direction2)

// 07-type 定义别名|联合类型｜交叉类型
type Status = number | string
type Gender = '男' | '女'
function printStatus(data: Status): void {
    console.log(data)
}
function printGender(data: Gender): void {
    console.log(data)
}

printStatus(404)
printStatus('404')
printGender('男')
printGender('女')
// printGender('nan')


// 面积
type Area = {
    height: number,
    width: number
}

// 地址
type Address = {
    num: number,
    cell: number,
    room: string
}

// 房子
type House = Area & Address

const house: House = {
    height: 100,
    width: 100,
    cell: 1,
    num: 50,
    room: '701'
}
// 先定义，void，后面使用的时候，并不会严格限制
type LogFunc = () => void

const f1: LogFunc = function () {
    // return undefined
    return 66 //ok
}

