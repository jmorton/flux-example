/**
 * Synchronize a something (IndexedDB, Dexie, Store, TBD) with an API.
 *
 * How do you handle...
 * - per user data?
 * - offline mode?
 * - API and schema changes?
 * - *when* does a db sync? 
 * - what happends if DB write succeeds, API call fails?
 * - what happens if API call succeeds, DB write fails?
 * - what is the relationship between the store and the db...
 *   ...how are sync events propagated? via the dispatcher?
 */


 var db = require("./db.js");
 
 // a return value provides but does not replace a pk. 
 db.people.hook("creating", function(pk, obj, tx) {
 });
 
 // a return value replaces modifications. do not mutate mod.
 db.people.hook("updating", function(mod, pk, obj, tx) { 
 });
 
 db.people.hook("deleting", function(pk, obj, tx) {
 });
 
 