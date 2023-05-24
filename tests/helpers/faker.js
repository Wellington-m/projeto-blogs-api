const faker = require("faker");

module.exports = {
  displayName: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  image: faker.image.people()
};