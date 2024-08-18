// const world = "world";

// export function hello(who: string = world) {
//   return `Hello ${who}! `;
// }

//interface
interface IStudent {
    name: string
    age: number
    email?: string
    isActive: boolean
}

const student: IStudent[] = []

const newStudent_1: IStudent = {
    name: '',
    age: 0,
    email: '',
    isActive: true,
}
console.log(newStudent_1)
