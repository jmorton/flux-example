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


var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");
var db = require("./db.js");

exports.db = db;

// when the db changes, we update the app state and emit an event.

// This is a store.  As an EventEmitter, we are able to register callbacks
// that can be used to refresh views when application state changes.
var PeopleStore = assign({}, EventEmitter.prototype, {

  all: function() {
    return this.collection;
  },

  selected: function() {
    return this.choice;
  },

  load: function() {
    var store = this;
    db.people.toArray().then(function(results) {
      store.choice = null;
      store.collection = results;
      store.emit("change");
    });
  },

  remove: function(action) {
    var store = this;
    var person_id = action.person_id;
    db.people.delete(person_id).then(function(results) {
      store.choice = null;
      store.load();
    })
  },

  unpick: function(action) {
    this.choice = null;
    this.emit("change");
  },

  save: function(action) {
    var store = this;
    var person = action.person;
    db.people.put(person).then(function(results) {
      store.choice = results;
      store.load();
    }).catch(function(error) {
      console.error(error);
    });
  },

  pick: function(action) {
    var store = this;
    var id = Number.parseInt(action.person_id);
    db.people.where("id").equals(id).first().then(function(results) {
      store.choice = results;
      store.emit("change");
    });
  },

  addChangeListener: function(callback) {
    this.on("change", callback);
  }

});

exports.PeopleStore = PeopleStore;