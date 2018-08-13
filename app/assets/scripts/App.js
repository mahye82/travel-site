// Making use of Node's require function to import a module
// const Person = require('./modules/Person');

// Use ES6 to import a module
import Person from './modules/Person';

class Adult extends Person {
    payTaxes() {
        console.log(this.name + " now owes $0 in taxes");
    }
}

alert("ABC 321");

const john = new Person("John Doe", "blue");
john.greet();
const jane = new Adult("Jane Doe", "orange");
jane.greet();
jane.payTaxes();
