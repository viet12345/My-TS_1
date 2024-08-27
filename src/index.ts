// const world = "world";

// export function hello(who: string = world) {
//   return `Hello ${who}! `;
// }
//enum
enum PetType {
    Dog,
    Cat,
    Bird = 'Bird',
}

//interface
interface IPet {
    name: string
    type: PetType
}

interface IStudent {
    name: string
    gender?: 'Male' | 'Female' | 'Unknow'
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
    gender: 'Unknow',
    name: 'string',
    age: 20,
    email: 'emailJunior@gmail.com',
    isActive: true,
}
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
    return student.pet?.name || ''
}

//Implement interface
class MyApp implements IJuniorStudent {
    name: string
    gender: 'Male' | 'Female' | 'Unknow'
    age: number
    email?: string
    isActive: boolean
    level: string
    pet?: IPet
    constructor(
        name: string,
        gender: 'Male' | 'Female' | 'Unknow',
        age: number,
        isActive: boolean,
        level: string,
        pet?: IPet,
        email?: string
    ) {
        this.name = name
        this.gender = gender
        this.age = age
        this.email = email
        this.isActive = isActive
        this.level = level
        this.pet = pet
    }
}

interface DataAdaptor {
    getData: () => IStudent[]
}
class StudentAdaptor implements DataAdaptor {
    getData() {
        const students: IStudent[] = [
            {
                name: 'Student A',
                gender: 'Female',
                age: 18,
                email: 'email1@gmail.com',
                isActive: true,
                pet: { name: 'Pet A', type: PetType.Bird },
            },
            {
                name: 'Student B',
                gender: 'Male',
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
