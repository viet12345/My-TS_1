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

type MixedDateType = string | Date | number
interface IStudent {
    name: string
    gender?: 'Male' | 'Female' | 'Unknow'
    dateOfBirth: MixedDateType
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
    dateOfBirth: 20,
    email: 'emailJunior@gmail.com',
    isActive: true,
}
// Type inference: When the type of newStudent_1 do not define, the system will not require it follow to the student type (the 'foo' prop still can acceptable)
const student: IStudent[] = []

const newStudent_1 = {
    name: 'A',
    dateOfBirth: 0,
    email: 'email@gmail.com',
    isActive: true,
    foo: 123,
}
student.push(newStudent_1)
// console.log(student)

function GetEmail(studentEmail: string) {
    return studentEmail
}

//Optional Chaining => mục đích là không để giá trị trả ra là unđefined
function GetPetName(student: IStudent) {
    return student.pet?.name || ''
}

//Implement interface
// class MyApp implements IJuniorStudent {
//     name: string
//     gender: 'Male' | 'Female' | 'Unknow'
//     dateOfBirth: number
//     email?: string
//     isActive: boolean
//     level: string
//     pet?: IPet
//     constructor(
//         name: string,
//         gender: 'Male' | 'Female' | 'Unknow',
//         dateOfBirth: number,
//         isActive: boolean,
//         level: string,
//         pet?: IPet,
//         email?: string
//     ) {
//         this.name = name
//         this.gender = gender
//         this.dateOfBirth = dateOfBirth
//         this.email = email
//         this.isActive = isActive
//         this.level = level
//         this.pet = pet
//     }
// }

interface DataAdaptor {
    getData: () => IStudent[]
}
class StudentAdaptor implements DataAdaptor {
    getData() {
        const students: IStudent[] = [
            {
                name: 'Student A',
                gender: 'Female',
                dateOfBirth: 18,
                email: 'email1@gmail.com',
                isActive: true,
                pet: { name: 'Pet A', type: PetType.Bird },
            },
            {
                name: 'Student B',
                gender: 'Male',
                dateOfBirth: '2000/12/17',
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

    //optional param: param nhận vào là 1 mảng các số | không có
    CalculateAverageAge(...numbers: number[]): number {
        // Nếu không có số nào được truyền vào, trả về NaN (hoặc có thể trả về 0 tùy theo yêu cầu)
        if (numbers.length === 0) {
            return NaN // Hoặc return 0 nếu bạn muốn xử lý trường hợp không có tham số
        }

        // Tính tổng các số
        const totalSum = numbers.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        )

        // Tính giá trị trung bình
        const average = totalSum / numbers.length

        return average
    }

    Render() {
        const student: IStudent[] = this.adapter.getData()
        console.table(student)
    }

    // Define MixedDateType to include string, Date, and number

    countAge(dateOfBirth: MixedDateType): number {
        if (typeof dateOfBirth === 'number') {
            // Directly return the number as age if dateOfBirth is a number
            return dateOfBirth
        }

        let birthDate: Date

        // Convert dateOfBirth to Date object if it's a string
        if (typeof dateOfBirth === 'string') {
            birthDate = new Date(dateOfBirth)
        } else if (dateOfBirth instanceof Date) {
            birthDate = dateOfBirth
        } else {
            throw new Error('Invalid dateOfBirth type')
        }

        // Ensure the dateOfBirth is valid
        if (isNaN(birthDate.getTime())) {
            throw new Error('Invalid dateOfBirth')
        }

        // Calculate age
        const now = new Date()
        let age = now.getFullYear() - birthDate.getFullYear()
        const monthDifference = now.getMonth() - birthDate.getMonth()

        // Adjust age if the birthday has not occurred yet this year
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && now.getDate() < birthDate.getDate())
        ) {
            age--
        }

        return age
    }
}

const myAdaptor = new StudentAdaptor()
const myAppData = new MyApp_1(myAdaptor)
const students = myAdaptor.getData()
let ageArray: number[] = []
students.forEach((student) => {
    try {
        const age = myAppData.countAge(student.dateOfBirth)
        console.log(`${student.name} is ${age} years old.`)
        ageArray.push(age)
    } catch (error: any) {
        console.error(
            `Error calculating age for ${student.name}: ${error.message}`
        )
    }
})
console.log(myAppData.CalculateAverageAge(...ageArray))

// console.log(myAppData.countAge('1990-01-01')) // Example with date string
// console.log(myAppData.countAge(new Date(1990, 1, 1))) // Example with Date object
// console.log(myAppData.countAge(32)) //Example with Number
