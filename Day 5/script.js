const student = [
    { fullName: 'Adina', age: 21, score: 78, grade: '10th', id: 1 },
    { fullName: 'Krisa', age: 23, score: 85, grade: '10th', id: 2 },
    { fullName: 'Nishma', age: 16, score: 92, grade: '10th', id: 3 },
    { fullName: 'Riya', age: 22, score: 67, grade: '10th', id: 4 },
    { fullName: 'Barsha', age: 20, score: 54, grade: '10th', id: 5 },
    { fullName: 'Kanchan', age: 19, score: 88, grade: '10th', id: 6 },
    { fullName: 'Anuj', age: 24, score: 77, grade: '10th', id: 7 },
    { fullName: 'Gautam', age: 29, score: 91, grade: '10th', id: 8 },
    { fullName: 'Raju', age: 27, score: 65, grade: '10th', id: 9 },
    { fullName: 'Ruby', age: 31, score: 80, grade: '10th', id: 10 }
];

// 1. Extract all full names
const studentNames = student.map(s => s.fullName);
console.log("1. Students Names: " + JSON.stringify(studentNames));

// 2. Calculate average age
const totalAge = student.reduce((sum, s) => sum + s.age, 0);
const meanAge = totalAge / student.length;
console.log("2. Average Age: " + meanAge.toFixed(1));

// 3. Check if every student belongs to Gen Z using conditional loop
const currentYear = new Date().getFullYear();
let allGenZ = true;

for (let i = 0; i < student.length; i++) {
    const birthYear = currentYear - student[i].age;
    if (birthYear < 1997 || birthYear > 2012) {
        allGenZ = false;
        break;
    }
}

console.log(allGenZ ? "3. Every student is Gen Z." : "3. Not every student is Gen Z.");

// 4. Get only Gen Z students
const genZStudents = student
    .filter(s => {
        const birthYear = currentYear - s.age;
        return birthYear >= 1997 && birthYear <= 2012;
    })
    .map(s => s.fullName);

console.log("4. Gen Z Students: " + JSON.stringify(genZStudents));
