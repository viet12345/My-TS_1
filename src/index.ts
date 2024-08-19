// const world = "world";

// export function hello(who: string = world) {
//   return `Hello ${who}! `;
// }

//interface
interface Pet {
    name: string
}

interface IStudent {
    name: string
    age: number
    email?: string
    isActive: boolean
    pet?: Pet
}

const student: IStudent[] = []

const newStudent_1: IStudent = {
    name: 'A',
    age: 0,
    email: 'email@gmail.com',
    isActive: true,
}
student.push(newStudent_1)

function GetEmail(studentEmail: string) {
    return studentEmail
}
if (newStudent_1.email) {
    console.log(GetEmail(newStudent_1.email))
}
//Optional Chaining => mục đích là không để giá trị trả ra là unđefined
function GetPetName(student: IStudent) {
    return student.pet?.name || ''
}

console.log(GetPetName(newStudent_1))
