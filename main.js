var prompt = require('prompt-sync')();
var a = 5;
var b = 6
var ans = a+b
console.log("answer is: "+ ans)

const result = 86;
console.log(result)
// result = 78 // Assignment to constant variable.
console.log(result)
// variables - let, var, const(necessary to assign and only once)

console.log(typeof result)
console.log(typeof "result")

const alphabets = ["a", "b", "c", "d", 5]
console.log(alphabets);
alphabets.push(true)
console.log(alphabets)
console.log(alphabets[3])
console.log(alphabets[0])

var hr = 12
if(hr < 16) {
    console.log("not allowed")
}else {
    console.log("allowed");
}

var n = 5
for(let i=0; i<n; i++) {
    console.log(i)
}

const person = {
    name : "John Doe",
    age: 20,
    isStudent: true,
    hobbies: ["reading", "singing"]
}
console.log(person)
console.log(person.hobbies)

const ages = [2,8,19,20,61]
function checkAges(age) {
    return age<=18
}
const ressult = ages.filter(checkAges)
console.log(ressult)

const age = prompt("Enter your age: ")
if(age < 18) {
    console.log("20% discount");
}else {
    console.log("30% discount")
}