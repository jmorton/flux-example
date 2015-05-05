// I considered working with IndexedDB directly, but Dexie is so sexie.

var Dexie = require("Dexie");

var db = new Dexie("FluxExample");

db.version(3).stores({
  people: 'id++, given-name, family-name'
});
db.open();

module.exports = db;