var Dexie = require("Dexie");

db = new Dexie("FluxExample");

db.version(3).stores({
  people: 'id++, given-name, family-name'
});
db.open();

module.exports = db;