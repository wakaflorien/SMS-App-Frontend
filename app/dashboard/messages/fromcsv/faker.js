// Faker generate
const { faker } = require('@faker-js/faker');
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';

let myNames = [];
for (let index = 0; index < 10; index++) {
    const randomName = faker.person.fullName(); // Rowan Nikolaus
    const randomPhone = faker.phone.number();
    const randomEmail = faker.internet.email();
    const randomDescription = faker.lorem.sentence();

    myNames.push({ name: randomName, phone_number: randomPhone, email: randomEmail, description: randomDescription });
}
console.log(JSON.stringify(myNames))
