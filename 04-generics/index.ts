// 泛型的使用
// 01-泛型函数
function printResult<T, U>(data1: T, data2: U): [T, U] {
    console.log(data1)
    console.log(data2)
    return [data1, data2]
}

printResult<number, string>(100, 'ok')
printResult<string, number>('success', 666)


// 02-泛型接口
interface UserInterface<T, U> {
    name: string
    age: number
    extraInfo: T
    extraInfo2: U
}

const u1: UserInterface<string, boolean> = {
    name: 'tom',
    age: 23,
    extraInfo: '初中',
    extraInfo2: false
}
console.log(u1)

type JobInfo = {
    title: string,
    company: string
}

interface PersonInterface<T> {
    name: string
    age: number
    extraInfo: T
}

let p1: PersonInterface<JobInfo> = {
    name: 'tom',
    age: 23,
    extraInfo: {
        title: '开发者',
        company: 'xxx公司'
    }
}

// 03-泛型类
class Person<T> {
    constructor(
        public name: string,
        public age: number,
        public extraInfo: T
    ) { }

    speak() {
        console.log(`我叫${this.name},今年${this.age}岁了`)
        console.log(this.extraInfo)
    }
}

let p22 = new Person<JobInfo>('tom', 23, { title: '开发者', company: 'xxx公司' })
p22.speak()



