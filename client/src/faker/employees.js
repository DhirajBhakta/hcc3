// employees.js
// var faker = require('faker')
//
// function generateEmployees () {
//   var employees = []
//
//   for (var id = 0; id < 50; id++) {
//     var firstName = faker.name.firstName()
//     var lastName = faker.name.lastName()
//     var email = faker.internet.email()
//
//     employees.push({
//       "id": id,
//       "first_name": firstName,
//       "last_name": lastName,
//       "email": email
//     })
//   }
//
//   return { "employees": employees }
// }
//
// module.exports = generateEmployees;

var faker = require('faker')

function generate () {
  var  items = []



  for (var id = 0; id < 100; id++) {
    var tradeName = faker.lorem.word();
    var genericName = faker.lorem.word();
    batches = [];
    for(var i=0; i<(Math.random()*10%4); i++)
      batches.push({
        "batch":faker.lorem.word(),
        "quantity":faker.random.number()%200,
        "rack":String(faker.random.number()%13)
      })
    items.push({
      "tradeName": tradeName,
      "genericName": genericName,
      "batches":batches
    })
  }

  return { "inventory": items }
}

module.exports = generate;
