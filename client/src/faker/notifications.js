var faker = require('faker')

var types = ["seen", "unseen", "acknowledged"]
function generateNotifications () {
  var notifications = []
  for (var id = 0; id < 50; id++) {
    var patient_name = faker.name.findName();
    var doctor_name = faker.name.findName();
    var diagnosis = faker.lorem.word();
    var date = faker.date.past();
    var type = types[Math.floor(Math.random() * 3)];
    var prescriptions = []

    for (var p_id = 0; p_id < 5; p_id++)
    {
      var drugname = faker.lorem.word();
      var quantity = faker.random.number()%100;
      var stores = []
      for(var s_id = 0; s_id < 3; s_id++)
      {
        var batch_no = faker.lorem.word() + faker.random.number() % 10 ;
        var quantity = faker.random.number() % 100 ;
        var expiry_date = faker.date.future() ;
        var rack = faker.lorem.word() + faker.random.number()%10;

        stores.push({
          "batch_no" : batch_no,
          "quantity" : quantity,
          "expiry_date" : expiry_date,
          "rack" : rack
        })
      }
      prescriptions.push({
        "drugname" : drugname,
        "quantity" : quantity,
        "stores" : stores
      })

    }
    notifications.push({
      "doctor_name" : doctor_name,
      "patient_name" : patient_name,
      "diagnosis": diagnosis,
      "date" : date,
      "type" : type,
      "prescription" : prescriptions
    })
  }
  return {"notifications" : notifications};
}
module.exports = generateNotifications

