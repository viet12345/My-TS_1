// const world = "world";

// export function hello(who: string = world) {
//   return `Hello ${who}! `;
// }

//interface
interface IPet {
    name: string
}

interface IStudent {
    name: string
    age: number
    email?: string
    isActive: boolean
    pet?: IPet
}

interface IJuniorStudent extends IStudent {
    level: string
}

const newJuniorStudent: IJuniorStudent = {
    level: 'Junior 1',
    name: 'string',
    age: 20,
    isActive: true,
    pet: { name: '$name' } || { name: 'NA' },
}
console.log(newJuniorStudent.pet?.name)

// Type inference: When the type of newStudent_1 do not define, the system will not require it follow to the student type (the 'foo' prop still can acceptable)
const student: IStudent[] = []

const newStudent_1 = {
    name: 'A',
    age: 0,
    email: 'email@gmail.com',
    isActive: true,
    foo: 123,
}
student.push(newStudent_1)
console.log(student)

function GetEmail(studentEmail: string) {
    return studentEmail
}

//Optional Chaining => mục đích là không để giá trị trả ra là unđefined
function GetPetName(student: IStudent) {
    return student.pet?.name
}

//Implement interface
class MyApp implements IJuniorStudent {
    constructor(
        public name: string,
        public age: number,
        public isActive: boolean,
        public level: string,
        public pet?: IPet,
        public email?: string
    ) {}
}

const data = new MyApp('Đây là name', 18, true, 'đây là level')

interface DataAdaptor {
    getData: () => IStudent[]
}
class StudentAdaptor implements DataAdaptor {
    getData() {
        const students: IStudent[] = [
            {
                name: 'Student A',
                age: 18,
                email: 'email1@gmail.com',
                isActive: true,
                pet: { name: 'Pet A' },
            },
            {
                name: 'Student B',
                age: 20,
                email: 'email2@gmail.com',
                isActive: false,
                pet: undefined,
            },
        ]
        return students
    }
}

class MyApp_1 {
    adapter: DataAdaptor
    constructor(adapter: DataAdaptor) {
        this.adapter = adapter
    }
    Render() {
        const student: IStudent[] = this.adapter.getData()
        console.table(student)
    }
}

const myAdaptor = new StudentAdaptor()
const myAppData = new MyApp_1(myAdaptor)
myAppData.Render()
