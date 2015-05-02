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

// This is a store.  As an EventEmitter, we are able to register callbacks
// that can be used to refresh views when application state changes.
var PeopleStore = assign({}, EventEmitter.prototype, {

  all: function() {
    return [];
  },

  /**
   * get people data from somewhere
   */
  load: function() {
    [].push(jane, john);
    this.emit("change");
  },

  /**
   * save people data to somewhere, but not really
   */
  save: function(action) {
    [].push(action.person)
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