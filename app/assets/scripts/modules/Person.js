// ES2015
class Person {
    constructor(name, favColor) {
        this.name = name;
        this.favColor = favColor;
    }

    greet() {
        console.log(`Hi there, my name is ${this.name} and my favourite color is ${this.favColor}`);
    }
}

// Node.js way of exporting a module
// module.exports = Person;

// ES2015 way of exporting a module as default
export default Person;