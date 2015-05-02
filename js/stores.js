/**
 * Stores manage application state and trigger updates to the view.
 *
 * However, stores do not directly reference views.  Instead, they
 * provide a way to register callback functions that isolate that
 * aspect elsewhere.
 *
 * We rely on two other modules to implement our stores:
 * 1. EventEmitter
 * 2. object-assign
 *
 */


var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var db = require("./db.js");

var jane = { "id":15, "given-name": "Jane", "family-name": "Smith" };
var john = { "id":16, "given-name": "John", "family-name": "Doe" };
exports.db = db;

// when the db changes, we update the app state and emit an event.

// This is a store.  As an EventEmitter, we are able to register callbacks
// that can be used to refresh views when application state changes.
var PeopleStore = assign({}, EventEmitter.prototype, {

  all: function() {
    console.log(this._people);
    return this.collection;
  },

  selected: function() {
    console.log("selected: " + this.pick);
    return this.pick;
  },

  /**
   * get people data from somewhere
   */
  load: function() {
    console.log("Loading, I'll query indexedDB!")
    var moof = this;
    db.people.toArray().then(function(results) {
      console.log("Query finished...I promised.");
      moof.collection = results;
      moof.emit("change");
    });
  },

  /**
   * save people data to somewhere, but not really
   */
  save: function(action) {
    var we = this;
    db.people.add(action.person).then(function(results) {
      we.load();
    });
  },

  show: function(action) {
    var we = this;
    console.log(action.person_id);
    var id = Number.parseInt(action.person_id);
    db.people.where("id").equals(id).first().then(function(results) {
      console.log("query results: " + results['id']);
      we.pick = results;
      we.emit("change");
    });
  },

  addChangeListener: function(callback) {
    console.log("Adding a change listener. About $3.50...");
    this.on("change", callback);
  }

});

exports.PeopleStore = PeopleStore;