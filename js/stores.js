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
    return this.collection;
  },

  selected: function() {
    return this.pick;
  },

  /**
   * get people data from somewhere
   */
  load: function() {
    var moof = this;
    db.people.toArray().then(function(results) {
      moof.collection = results;
      moof.emit("change");
    });
  },

  /**
   * save people data to somewhere, but not really
   */
  save: function(action) {
    var store = this;
    db.people.add(action.person).then(function(results) {
      store.load();
    });
  },

  show: function(action) {
    var store = this;
    var id = Number.parseInt(action.person_id);
    db.people.where("id").equals(id).first().then(function(results) {
      store.pick = results;
      store.emit("change");
    });
  },

  addChangeListener: function(callback) {
    this.on("change", callback);
  }

});

exports.PeopleStore = PeopleStore;