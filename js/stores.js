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

var jane = { "given-name": "Jane", "family-name": "Smith" };
var john = { "given-name": "John", "family-name": "Doe" };

var people_db = [];

// This is a store.  As an EventEmitter, we are able to register callbacks
// that can be used to refresh views when application state changes.
var PeopleStore = assign({}, EventEmitter.prototype, {

  all: function() {
    return people_db;
  },

  /**
   * get people data from somewhere
   */
  load: function() {
    people_db.push(jane, john);
    this.emit("change");
  },

  /**
   * save people data to somewhere, but not really
   */
  save: function(action) {
    people_db.push(action.person)
    this.emit("change");
  },

  show: function(action) {
    this.emit("show");
  },

  addChangeListener: function(callback) {
    this.on("change", callback);
  }

});

exports.PeopleStore = PeopleStore;